const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraKey = "<Infura API Key";
const mnemonic = "<Wallet Mnemonic>";

module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000
    }
  },

  mocha: {
  },

  compilers: {
    solc: {
    }
  }
}
