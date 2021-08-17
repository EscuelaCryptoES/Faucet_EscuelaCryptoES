# Faucet_EscuelaCryptoES

Faucet de la testnet de Rinkeby para todos los miembros del grupo de Telegram EscuelaCryptoES

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/EscuelaCryptoES/Faucet_EscuelaCryptoES.git
cd Faucet_EscuelaCryptoES/client
npm install
```

Once installed, let's run NodeJS's server:

```sh
npm run dev
```

Finally, on a new terminal, go to the repository's client/demo folder and run this to start the frontend:

```sh
npm install
npm start
```

With the code open, you'll also have to modify the app.js, and add your infura endpoint aswell as you ETH address and private key.
If you redeploy the contract you need to change the contract address aswell.