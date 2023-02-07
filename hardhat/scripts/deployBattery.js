const { ThirdwebStorage } =  require("@thirdweb-dev/storage");
const dataBattery =  require('../data.json');
const fs =  require('fs');
const { ThirdwebSDK } =  require("@thirdweb-dev/sdk");
const {} =  require('dotenv/config');


start();


async function start()
{
  const storage = new ThirdwebStorage();  
  for (let i = 0; i < dataBattery.length; i++) {
      const filepath="./contract/images/"+dataBattery[i].name+".png";
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
  }
}