export default {
  seed: () => [
    { name: 'telegram', regex:'Buy.*#(.*)\n.*Buy Price: (.*)\n*Sell Price: (.*) \+.*\n.*Stop Loss: (.*) -' },
  ]
};
