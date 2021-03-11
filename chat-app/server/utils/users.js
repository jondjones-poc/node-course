class Users {
    constructor () {
        this.users = [];
    };

    addUser (id, name, room) {
        const newUser =  {
            id, name, room
        };

        this.users.push(newUser);
        return newUser;
    };
    
    removeUser (id) {
        const userToRemove = this.users.filter((user) => user.id === id);
        const users = this.users.filter((user) => user.id !== id);

        this.users = users;
        return userToRemove[0];
    };
    
    getUser (id) {
        const user = this.users.filter((user) => user.id === id);
        return user[0];
    };
    
    getUserList (room) {
        const usersInRoom = this.users.filter((user) => user.room === room);

        console.log(usersInRoom);
        const names = usersInRoom.map((user) => user.name);

        return names;
    };
};

module.exports = { Users };