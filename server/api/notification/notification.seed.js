import User from '../user/user.model';

export default {
  dependencies: [User],
  seed: users => [
    {
      user: users[0],
      involvedUser: users[1],
      content: `${users[1].name.first} ${users[1].name.last} has shared his list with you`
    },
    {
      user: users[0],
      involvedUser: users[1],
      content: `${users[1].name.first} ${users[1].name.last} has liked your list Travel to Rome`
    }
  ]
};
