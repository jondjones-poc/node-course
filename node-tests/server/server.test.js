const expect = require('expect');
const request = require('supertest');
const server = require('./server');

it('GivenAHomepageRequest_WhenServerCalled_ThenCorrectPageReturned', () => {
    request(server.app)
    .get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect('Hello World')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
});

it('GivenA404Request_WhenServerCalled_Then404Returned', (done) => {
    request(server.app)
    .get('/notfound')
    .expect(404)
    .expect((res) => {
        expect(res.body).toMatchObject({
            error: 'Page not found.'
        })
    })
    .end(done);
});

it('GivenA4RequestForUsers_WhenServerCalled_ThenUserReturned', (done) => {
    request(server.app)
    .get('/users')
    .expect(200)
    .expect((res) => {
        expect(res.body[0]).toMatchObject({
            name: 'jon'
        })
    })
    .end(done);
});
