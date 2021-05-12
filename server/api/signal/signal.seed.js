import User from '../user/user.model';

export default {
  seed: () => [
    {
      name: 'LTCUSD',
      entryPrice: 1900.87,
      takeProfit: 1940.76,
      stopLoss: 1870.21,
      pairName:"COMP/USDT",
      channelName:"HIRN_CRYPTO"
    },
    {
      name: 'BTC.1',
      entryPrice: 45.87,
      takeProfit: 2313.76,
      stopLoss: 7.21,      
      pairName:"COMP/USDT",
      channelName:"HIRN_CRYPTO"
    },
    {
      name: 'BTCUSD',
      entryPrice: 8,
      takeProfit: 99.76,
      stopLoss: 5654.21,
      pairName:"COMP/USDT",
      channelName:"HIRN_CRYPTO"
    }
  ]
};
