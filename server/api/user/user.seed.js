import times from 'lodash/times';

export default {
  seed: () => [
    {
      name: {
        first: 'rick',
        last: 'sanchez'
      },
      email: 'rick@gmail.com',
      password: '123456789',
      username: 'rick',
      admin: true
    },
    {
      name: {
        first: 'morty',
        last: 'sanchez'
      },
      username: 'morty',
      email: 'morty@gmail.com',
      password: '123456789'
    },
    {
      name: {
        first: 'Sharon',
        last: 'Grossman'
      },
      username: 'sharon',
      email: 'sharon@gmail.com',
      password: '123'
    },
    {
      name: {
        first: 'Shir',
        last: 'Magen'
      },
      username: 'shir',
      email: 'shir@gmail.com',
      password: '123'
    },
    ...times(150, index => ({
      name: {
        first: `Bot ${index}`,
        last: `Botted ${index}`
      },
      username: `bot${index}`,
      email: `bot${index}@gmail.com`,
      password: '123'
    }))
  ]
};
