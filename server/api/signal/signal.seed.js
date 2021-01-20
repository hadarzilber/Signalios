import User from '../user/user.model';

export default {
  seed: () => [
    {
      name: 'LTCUSD',
      recommended: 75,
      isActive: true
    },
    {
      name: 'BTC.1',
      recommended: 80,
      isActive: false
    },
    {
      name: 'BTCUSD',
      recommended: 80,
      isActive: true
    }
  ]
};
