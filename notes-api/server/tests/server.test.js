const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {todos, populateTodos,users,populateUsers} = require('./seeds/seed');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

// setup
beforeEach(populateTodos);
beforeEach(populateUsers);

// test variables
const idThatDoesntExist = '6b0fac8eff64510a45b43e91';
const invalidId = '6b0fac8eff64510a45b43e91fhhh';

describe('POST /todos', () => {
    it('GivenANewTodo_WhenTodosCalled_ThenTodoCreatedInDatabase', (done) => {
        const text = 'Todo Text';

        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('GivenABadInvalidBodyData_WhenTodosCalled_ThenTodoShouldNotCreate', (done) => {
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(todos.length);
                done();
            }).catch((e) => done(e));
        });
    });
});


describe('GET /todos', () => {
    it('GivenABadInvalidBodyData_WhenTodosCalled_ThenTodoShouldNotCreate', (done) => {
        request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });

    });
});

describe('GET /todos/:id', () => {
    it('GivenAValidId_WhenTodosCalled_ThenTodoReturned', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(200)
        .expect((res) => {
            expect(res.body.todo).toBeDefined();
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });
    
    it('GivenAInValidId_WhenTodosCalled_Then404Returned', (done) => {
            request(app)
            .get(`/todos/${invalidId}`)
            .set('x-auth', users[0].tokens[0].token)
            .send()
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
    
                done();
            });
    });

    it('GivenAIdThatDoesntExist_WhenTodosCalled_Then404Returned', (done) => {
        request(app)
        .get(`/todos/${idThatDoesntExist}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenALoggedInUser_WhenTodosCalled_TheyShouldNotBeAbleToAccessOtherUsersTodos', (done) => {
        request(app)
        .get(`/todos/${todos[1]._id}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(404)
        .expect((res) => {
            expect(res.body.todo).toBeUndefined();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });
});

describe('DELETE /todos/:id', () => {
    it('GivenAValidTodoIdAndAuthenicated_WhenDeleteRequestIsMade_ThenTodoDeleted', (done) => {

        const id = todos[0]._id;
        console.log('id:', id);

        request(app)
        .delete(`/todos/${id}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(200)
        .expect((res) => {
            console.log(res.body.todo);
            expect(res.body.todo).toBeDefined();
            expect(res.body.todo._id.toString()).toBe(id.toString());

            Todo.findById(id).then((todo) => {
                expect(todo).toBeNull();
              }).catch((e) => done(e));
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenAInValidTodoIdAndAuthenticated_WhenDeleteRequestIsMade_Then404Returned', (done) => {
        request(app)
        .delete(`/todos/${invalidId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenAIdThatDoesntExistAndAuthenicated_WhenDeleteRequestIsMade_Then404Returned', (done) => {
        request(app)
        .delete(`/todos/${idThatDoesntExist}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenAIdForAnotherUsersTodoAndAuthenicated_WhenDeleteRequestIsMade_Then404Returned', (done) => {
        request(app)
        .delete(`/todos/${todos[1]._id}`)
        .set('x-auth', users[0].tokens[0].token)
        .send()
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });
});

describe('PATCH /todos/:id', () => {
    it('GivenAValidEditableTodo_WhenEditRequestIsMade_ThenTodoUpdatedCorrectly', (done) => {

        const id = todos[1]._id;
        const text = 'edit';
        const completed = false;

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed
            })
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo).toBeDefined();
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(completed);
            })
            .end(done);
     });


    it('GivenAInValidId_WhenEditRequestIsMade_Then404Returned', (done) => {
        const text = 'edit';
        const completed = false;

        request(app)
        .patch(`/todos/${invalidId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send({
            text,
            completed
        })
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenAIdThatDoesntExist_WhenEditTodoRequestIsMade_Then404Returned', (done) => {

        const text = 'edit';
        const completed = false;
        console.log('idThatDoesntExist:', idThatDoesntExist);

        request(app)
        .patch(`/todos/${idThatDoesntExist}`)
        .set('x-auth', users[0].tokens[0].token)
        .send({
            text,
            completed
        })
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });
});


describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        const token = users[0].tokens[0].token;
        request(app)
            .get('/users/me')
            .set('x-auth', token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
                expect(res.body._id).toEqual(undefined);
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('GivenANewUser_WhenUsersCalled_ThenUserCreatedInDatabase', (done) => {
        const newUser = {
            "email": "test@test.com",
            "password": "myPassword"
        };

        request(app)
        .post('/users')
        .send(newUser)
        .expect(200)
        .expect((res) => {
            expect(res.body.email).toBe(newUser.email);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            const email = newUser.email;
            User.find({email}).then((user) => {

                expect(user.length).toBe(1);
                expect(user[0].email).toBe(newUser.email);
                done();
            }).catch((e) => done(e));
        });
    });

    it('GivenNoPassword_WhenUsersCalled_ThenUserCreatedInDatabase', (done) => {
        request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
    });

    it('GivenDuplicateEmail_WhenUsersCalled_ThenNewUserNotCreated', (done) => {
        const newUser = {
            "email": users[0].email,
            "password": "myPassword"
        };

        request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .expect((res) => {
            expect(res.body).toEqual({});
            expect(res.error.text).toBe('Unable to save user');
        })
        .end(done);
    });
});

describe('POST /users/login', () => {
    it('GivenValidLogin_WhenTryAndLogin_UserLoggedIn', (done) => {

        const loginUser = {
            id: users[0]._id,
            email: users[0].email,
            password: users[0].password
        };

        request(app)
        .post('/users/login')
        .send(loginUser)
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeDefined();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            User.findById(loginUser.id).then((user) => {
                expect(user.tokens[0].access).toBe('auth');            
                done();
            }).catch((e) => done(e));
        });
    });

    it('GivenInvalidLogin_WhenTryAndLogin_ErrorThrown', (done) => {
        const loginUser = {
            email: 'crap',
            password: 'crap'
        };

        request(app)
        .post('/users/login')
        .send(loginUser)
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeUndefined();
        });
        done();
    });
})

describe('POST /users/me/token LOGOUT', () => {
    it('GivenValidCredentials_WhenTryAndLogout_UserLoggedOut', (done) => {
        const loginUser = {
            id: users[0]._id,
            email: users[0].email,
            password: users[0].password
        };

        request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .send(loginUser)
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeUndefined();
        })
        .end((err, res) => {
            if (err) {
                console.log('error');
                return done(err);
            }
            User.findById(loginUser.id).then((user) => {
                console.log(user);
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
})