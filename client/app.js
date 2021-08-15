const web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

var express = require('express')
  , bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/312c66c4c0c8493d9ec03e13553c83d4"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post("/post", (req, res) => {

  // your JSON 
  console.log(req.body.telegramUser);
  console.log(req.body.ethereumAddress);

  var telegram_user = req.body.telegramUser;
  var user_ethAddress = req.body.ethereumAddress;

  //if (ethAddress != Ethereum Address Format || ethAddress == '')

  var myAddress = '0x0f5f332B08f5A6D975b12FAdea0C74B622270B0B';
  var privateKey = Buffer.from('b3a7648ee2b2068ede09f6de261b6a9fbc7df22fa7347664809a1aaf31b403a6', 'hex')
  //var toAddress = '0x3356328f46BaB773804e3a6C28828aA09Cee2feD';

  //contract abi is the array that you can get from the ethereum wallet or etherscan
  var contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"getCooldownTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_user","type":"string"},{"internalType":"address","name":"_to","type":"address"}],"name":"refundUser","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"seeMyInfo","outputs":[{"components":[{"internalType":"string","name":"telegram_User","type":"string"},{"internalType":"bool","name":"stored","type":"bool"},{"internalType":"uint64","name":"readyTime","type":"uint64"}],"internalType":"struct RinkebyECESFaucet.User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_days","type":"uint256"}],"name":"setCooldownTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
  var contractAddress ="0x412EDE4bbc3Bd1f2Cf49030e080a7fd7453C3dB0";
  //creating contract object
  var contract = new web3js.eth.Contract(contractABI,contractAddress);
  
  var count;

  // get transaction count, later will used as nonce
  web3js.eth.getTransactionCount(myAddress).then(function(v){
    console.log("Count: "+v);
    count = v;

    var amount = web3js.utils.toHex(1e16);

    //creating raw tranaction
    var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.refundUser(telegram_user, user_ethAddress).encodeABI(),"nonce":web3js.utils.toHex(count)}
    console.log(rawTransaction);

    //creating tranaction via ethereumjs-tx
    var transaction = new Tx(rawTransaction, {chain: 'rinkeby', hardfork: 'petersburg'});

    //signing transaction with private key
    transaction.sign(privateKey);

    //sending transacton via web3js module
    const serializedTx = '0x'+transaction.serialize().toString('hex');
    web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
    .on('transactionHash',console.log);

    console.log('We\'ve finished')
})













   // echo the result back
   res.send("Works"); 
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));