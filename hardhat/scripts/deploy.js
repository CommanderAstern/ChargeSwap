async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BatterySwap = await ethers.getContractFactory("BatterySwap");
  const batterySwap = await BatterySwap.deploy();

  console.log("BatterySwap address:", batterySwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })