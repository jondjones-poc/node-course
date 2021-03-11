const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Jon',
            room: 'room'
        }, {
            id: '2',
            name: 'Steve',
            room: 'room'
        }, {
            id: '3',
            name: 'Amo',
            room: 'stupidrooms'
        }];
    });

    it('GivenData_WhenAddUser_ThenNewusersReturned', () => {
        const users = new Users();

        const newUser = {
            id: 'id',
            name: 'name',
            room: 'room'
        };

        users.addUser(newUser.id, newUser.name, newUser.room);

        expect(users.users).toEqual([newUser]);
    });

    it('GivenARoomWithPeopeInIt_WhenGetUserList_ThenCorrectNumberOfResultsReturned', () => {
        const result = users.getUserList('room');
        expect(result.length).toBeGreaterThan(1);
    });

    it('GivenARoomWithNoPeopeInIt_WhenGetUserList_ThenZeroReturnedAnNoErrorThrown', () => {
        const result = users.getUserList('gfgfd');
        expect(result.length).toBe(0);
    });

    it('GivenAPersonWithValidId_WhenGetUser_ThenValidUserReturned', () => {
        const user = users.getUser(users.users[0].id);
        expect(user.name).toEqual(users.users[0].name);
    });

    it('GivenAPersonWithInValidId_WhenGetUserList_ThenZeroReturnedAnNoErrorThrown', () => {
        const result = users.getUserList('gfgfd');
        expect(result).toEqual([]);
    });

    it('GivenAPersonWithValidId_WhenRemoveUser_ThenUserRemoved', () => {
        const removedUser = users.removeUser('1');
        expect(removedUser.name).toEqual('Jon');
        expect(users.users.length).toBe(2);
    });

    it('GivenAPersonWithInValidId_WhenRemoveUser_ThenNoUsersRemoved', () => {
        const result = users.removeUser('gfgfd');
        expect(result).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});
