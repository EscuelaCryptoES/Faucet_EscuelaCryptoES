const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx').Transaction;

const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/312c66c4c0c8493d9ec03e13553c83d4"));

app.get('/sendtx',function(req,res){

        var myAddress = '0x0f5f332B08f5A6D975b12FAdea0C74B622270B0B';
        var privateKey = Buffer.from('b3a7648ee2b2068ede09f6de261b6a9fbc7df22fa7347664809a1aaf31b403a6', 'hex')
        var toAddress = '0x3356328f46BaB773804e3a6C28828aA09Cee2feD';

        //contract abi is the array that you can get from the ethereum wallet or etherscan
        var contractABI = [{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transfer","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
        var contractAddress ="0x062Fd24F0C932f5Ded6e3c48fD6c141A3017efa6";
        //creating contract object
        var contract = new web3js.eth.Contract(contractABI,contractAddress);

        var count;
        // get transaction count, later will used as nonce
        web3js.eth.getTransactionCount(myAddress).then(function(v){
            console.log("Count: "+v);
            count = v;
            var amount = web3js.utils.toHex(1e16);
            //creating raw tranaction
            var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.transfer(toAddress).encodeABI(),"nonce":web3js.utils.toHex(count)}
            console.log(rawTransaction);
            //creating tranaction via ethereumjs-tx
            var transaction = new Tx(rawTransaction, {chain: 'rinkeby', hardfork: 'petersburg'});
            //signing transaction with private key
            transaction.sign(privateKey);
            console.log("Llego")
            //sending transacton via web3js module
            const serializedTx = '0x'+transaction.serialize().toString('hex');
            web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash',console.log);
            console.log('We\'ve finished')
                
            //contract.methods.balanceOf(myAddress).call().then(function(balance){console.log(balance)});
        })
    });
app.listen(3000, () => console.log('Example app listening on port 3000!'))