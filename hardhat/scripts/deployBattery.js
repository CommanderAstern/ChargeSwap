const { ThirdwebStorage } =  require("@thirdweb-dev/storage");
const { ethers } = require("hardhat");
const dataBattery =  require('../data.json');
const fs =  require('fs');
const { ThirdwebSDK } =  require("@thirdweb-dev/sdk");
const {} =  require('dotenv/config');
const abi = require('../../client/src/artifacts/contracts/BatterySwap.sol/BatterySwap.json');

start();

async function start()
{
  const storage = new ThirdwebStorage();  

  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
  const sdk = ThirdwebSDK.fromPrivateKey(GOERLI_PRIVATE_KEY, "goerli");
  const contract = await sdk.getContractFromAbi("0xF21a8dfb7F01792802d4a0d0C9905e01fc5A9672",abi.abi);

  for (let i = 0; i < dataBattery.length; i++) {
      const metadata = {
            name: dataBattery[i].name,
            capacity: dataBattery[i].capacity,
            current: dataBattery[i].current,
            voltage: dataBattery[i].voltage,
            maxTemprature: dataBattery[i].maxTemprature,
            company: dataBattery[i].company,
            dateOfManufacture: dataBattery[i].dateOfManufacture,
        };
      const uri = await storage.upload({"battery":metadata});
      console.log("https://gateway.ipfscdn.io/ipfs/"+uri.slice(7));
      var result = await contract.call("addNewBatteryToStation", 1, uri, dataBattery[i].rfid);
  }  
}