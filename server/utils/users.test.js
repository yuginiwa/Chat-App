const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'carl',
      room: 'kulitan 1'
    },{
      id: '2',
      name: 'ela',
      room: 'cavite 3'
    },{
      id: '3',
      name: 'nicole',
      room: 'kulitan 1'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "carl",
      room: "uzzap"
    };

    var res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
    // var userList = users.removeUser('2');
    //
    // expect(userList).toEqual(['carl', 'nicole']);
  });

  it('should not remove a user', () => {
    var userId = '4';
    var user = users.removeUser(userId);

    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
    // var userList = users.removeUser('4');
    //
    // expect(userList).toEqual(['carl', 'ela', 'nicole']);
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
    // var findUser = users.getUser('3');
    //
    // expect(findUser).toEqual(['nicole']);
  });

  it('should not find a user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
    // var findUser = users.getUser('4');
    //
    // expect(findUser).toEqual([]);
  });

  it('should return names for kulitan 1', () => {
    var userList = users.getUserList('kulitan 1');

    expect(userList).toEqual(['carl', 'nicole']);
  });

  it('should return name for cavite 3', () => {
    var userList = users.getUserList('cavite 3');

    expect(userList).toEqual(['ela']);
  });
});
