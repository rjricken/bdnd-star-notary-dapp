# Star Notary Ethereum DApp

This is a DApp created on Ethereum as part of the Blockchain Developer Nanodegree program at Udacity. It was designed as an ERC-721 non fungible token that represents a single star in the sky. Once claimed, a star can be transferred or exchanged with other users, as well as being sold to interested users.

Contract address (Rinkeby): `https://rinkeby.etherscan.io/address/0xB6A846C4Dc68878ee9aF2d499eA4FAe315f91FB4`

**Details**:
* ERC-721 Token Name: `Star Token`
* ERC-721 Token Symbol: `STR`
* Truffle version used: `5.0.28`
* OpenZeppelin version used: `2.3.0`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on the testnet.

### Prerequisites

You'll need Node.js v8.11 or higher and NPM v5.8 or higher.

### Installing

Install the dependencies with NPM:

```bash
npm install
cd app
npm install
```

## Deployment

The DApp contract can be deployed to a local or the Rinkeby test network using the following commands:

```bash
truffle compile
truffle test
truffle migrate --network development|rinkeby
```

> To deploy to the Rinkeby test network, you'll have to edit the truffle-config file and fill in with your own Infura API key and wallet mnemonics.

To start the front end app run the following command in the `/app` folder:

```bash
npm run dev
```

The app will be available on [http://localhost:8080](http://localhost:8080)
