#include <WiFi.h>
#include <Web3.h>
#include <Util.h>
#include <Contract.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

const char *ssid = "Asim";
const char *password = "ilikewater";
#define MY_ADDRESS "0xB7E99669e9eDdD2975511FBF059d01969f43D409"      //Put your wallet address here
#define BATTERYCONTRACT  "0xcFfB78dc49c7b096F046d77788014832dcbabF53"  //Put your ERC20 contract address here
#define ETHERSCAN_TX "https://mumbai.polygonscan.com/tx/"

// Copy/paste the private key from MetaMask in here
const char *PRIVATE_KEY = "a12e71ebe9a4bc009a99f6b0a99c8f24163ce13d39979100adb2a1a74c7519b7"; //32 Byte Private key 

const char* serverName = "https://restPolygon.asimjawahir.repl.co/";
int wificounter = 0;
Web3 *web3;

void setup_wifi();
void PushERC875Transaction(); 
void queryERC875Balance(const char *userAddress);
void sendEthToAddress(double eth, const char *destination);
void PushERC20Transaction(double tokens, const char *toAddr, const char *contractAddr);
void addNewBattery(int currentStation, String &&rfid, String &&metaABI,  const char *contractAddr);

void setup() {
    Serial.begin(115200);
    web3 = new Web3(MUMBAI_TEST_ID);

    setup_wifi();

    // sendEthToAddress(0.01, TARGETADDRESS);
    addNewBattery(1, "e510b430", "QmdT7LTDYfXKQJGaebZeFFwtWsTg89QXVsbzzvaubJce8q", BATTERYCONTRACT);
    Serial.println("createdBattery");
}

void loop() {

}
void addNewBattery(int currentStation, String &&rfid, String &&metaABI,  const char *contractAddr)
{
	string contractAddrStr = contractAddr;
	Contract contract(web3, contractAddr);
	contract.SetPrivateKey(PRIVATE_KEY);

  string addr = BATTERYCONTRACT;
  string fromAddr = MY_ADDRESS;
	//Get contract name (This isn't needed to push the transaction)
	string param = contract.SetupContractData("name()", &addr);
	string result = contract.ViewCall(&param);
	string interpreted = Util::InterpretStringResult(web3->getString(&result).c_str());
	Serial.println(interpreted.c_str());

	//Get ethPerCharge decimals
	param = contract.SetupContractData("ethPerCharge()", &addr);
	result = contract.ViewCall(&param);
  Serial.println(result.c_str());
	long long int ethPerCharge = web3->getLongLong(&result);
	Serial.println(ethPerCharge);

	unsigned long long gasPriceVal = 22000000000ULL;
	uint32_t  gasLimitVal = 90000;

	//amount of erc20 token to send, note we use decimal value obtained earlier

  string weiTemp = "0";
  uint256_t weiValue = uint256_t(weiTemp.c_str());

  String transTemp = String(ethPerCharge*100);
  Serial.println(String(transTemp));
  uint256_t transValue = uint256_t(transTemp.c_str());
  //uint256_t for ethPerCharge

  Serial.println("Works 1");
  uint256_t stationValue = uint256_t(String(currentStation).c_str());
  Serial.println("Works 2");
	//get nonce
	uint32_t nonceVal = (uint32_t)web3->EthGetTransactionCount(&fromAddr);
  Serial.println("Works 3");
	// //Setup contract function call
	string p = contract.SetupContractData("addNewBatteryToStation(uint256)", &stationValue);
  Serial.println("Works 4");
	// //push transaction to ethereum
	result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &contractAddrStr, &weiValue, &p);
  Serial.println("Works 5");
  Serial.println(result.c_str());

	// string transactionHash = web3->getString(&result);
}
// void sendEthToAddress(double eth, const char *destination)
// {
// 	//obtain a contract object, for just sending eth doesn't need a contract address
// 	Contract contract(web3, "");
// 	contract.SetPrivateKey(PRIVATE_KEY);
// 	unsigned long long gasPriceVal = 22000000000ULL;
// 	uint32_t  gasLimitVal = 90000;
// 	string address = MY_ADDRESS;
//   string toaddress = TARGETADDRESS;
// 	//convert eth value to Wei
// 	// uint256_t weiValue = Util::ConvertToWei(eth, 18);

//   // 0.01
//   string weiTemp = "1000000000000";
//   uint256_t weiValue = uint256_t(weiTemp.c_str());
// 	string emptyString = "";
// 	string destinationAddress = destination;

// 	Serial.print("Get Nonce: ");
// 	uint32_t nonceVal = (uint32_t)web3->EthGetTransactionCount(&address);
// 	Serial.println(nonceVal);
// 	Serial.println("Send TX");
// 	string result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &toaddress, &weiValue, &emptyString);
// 	Serial.println(result.c_str());

// 	string transactionHash = web3->getString(&result);
// 	Serial.println("TX on Etherscan:");
// 	Serial.print(ETHERSCAN_TX);
// 	Serial.println(transactionHash.c_str()); //you can go straight to etherscan and see the pending transaction
// }

// void PushERC20Transaction(double tokens, const char *toAddr, const char *contractAddr) 
// {
// 	string contractAddrStr = contractAddr;
// 	Contract contract(web3, contractAddr);
// 	contract.SetPrivateKey(PRIVATE_KEY);

//   string addr = ERC20CONTRACT;
//   string fromAddr = MY_ADDRESS;
// 	//Get contract name (This isn't needed to push the transaction)
// 	string param = contract.SetupContractData("name()", &addr);
// 	string result = contract.ViewCall(&param);
// 	string interpreted = Util::InterpretStringResult(web3->getString(&result).c_str());
// 	Serial.println(interpreted.c_str());

// 	//Get Contract decimals
// 	param = contract.SetupContractData("decimals()", &addr);
// 	result = contract.ViewCall(&param);
// 	int decimals = web3->getInt(&result);
// 	Serial.println(decimals);

// 	unsigned long long gasPriceVal = 22000000000ULL;
// 	uint32_t  gasLimitVal = 90000;

// 	//amount of erc20 token to send, note we use decimal value obtained earlier
// 	// uint256_t weiValue = Util::ConvertToWei(tokens, 18);

//   string weiTemp = "0";
//   uint256_t weiValue = uint256_t(weiTemp.c_str());

//   string transTemp = "1000000000000";
//   uint256_t transValue = uint256_t(transTemp.c_str());


// 	//get nonce
// 	uint32_t nonceVal = (uint32_t)web3->EthGetTransactionCount(&fromAddr);
// 	string toAddress = toAddr;
// 	string valueStr = "0x00";
//   string emptyString = "";
// 	//Setup contract function call
// 	string p = contract.SetupContractData("transfer(address,uint256)", &toAddress, &transValue); //ERC20 function plus params

// 	//push transaction to ethereum
// 	result = contract.SendTransaction(nonceVal, gasPriceVal, gasLimitVal, &contractAddrStr, &weiValue, &p);
//   Serial.println(result.c_str());

// 	string transactionHash = web3->getString(&result);
// }




/* This routine is specifically geared for ESP32 perculiarities */
/* You may need to change the code as required */
/* It should work on 8266 as well */
void setup_wifi()
{
    if (WiFi.status() == WL_CONNECTED)
    {
        return;
    }

    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    if (WiFi.status() != WL_CONNECTED)
    {
        WiFi.persistent(false);
        WiFi.mode(WIFI_OFF);
        WiFi.mode(WIFI_STA);

        WiFi.begin(ssid, password);
    }

    wificounter = 0;
    while (WiFi.status() != WL_CONNECTED && wificounter < 10)
    {
        for (int i = 0; i < 500; i++)
        {
            delay(1);
        }
        Serial.print(".");
        wificounter++;
    }

    if (wificounter >= 10)
    {
        Serial.println("Restarting ...");
        ESP.restart(); //targetting 8266 & Esp32 - you may need to replace this
    }

    delay(10);

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}