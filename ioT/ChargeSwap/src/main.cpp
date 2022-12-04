#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ESPmDNS.h>

const char *ssid = "Asim";
const char *password = "ilikewater";
#define MY_ADDRESS "0xB7E99669e9eDdD2975511FBF059d01969f43D409"      //Put your wallet address here
#define BATTERYCONTRACT  "0xcFfB78dc49c7b096F046d77788014832dcbabF53"  //Put your ERC20 contract address here
#define ETHERSCAN_TX "https://mumbai.polygonscan.com/tx/"

// Copy/paste the private key from MetaMask in here
const char *PRIVATE_KEY = "a12e71ebe9a4bc009a99f6b0a99c8f24163ce13d39979100adb2a1a74c7519b7"; //32 Byte Private key 

const char* serverName = "https://restpolygon.asimjawahir.repl.co/";
int wificounter = 0;

void setup_wifi();
void addNewBatteryToStation(int currentStation, String rfid, String metaABI,  const char *contractAddr);
String getBatteryInfo(String rfid);
void setup() {
    Serial.begin(115200);
    // Add
    setup_wifi();
    
    String json = "27,100,1670073646,0,1,\"0x0000000000000000000000000000000000000000\",\"QmdT7LTDYfXKQJGaebZeFFwtWsTg89QXVsbzzvaubJce8q\"";

    // split into parts based on commas
    int index = 0;
    String parts[7];
    for (int i = 0; i < json.length(); i++) {
      if (json[i] == ',') {
        index++;
      } else {
        parts[index] += json[i];
      }
    }

    // print everything in parts
    for (int i = 0; i < 7; i++) {
      Serial.print(parts[i]);
      Serial.print(" ");
    } 
    Serial.println();

}

void loop() {
    // pushButtonCounter
    


}
String getBatteryInfo(String rfid)
{
    WiFiClientSecure client;
    client.setInsecure();
    String url = String(serverName) + "getBatteryDetailsRFID?rfid=" + rfid;

    client.connect(url.c_str(), 443);
    HTTPClient http;
    Serial.println("connecting to server "+ url);
    http.begin(client, url);

    http.addHeader("Content-Type", "application/json");
    http.addHeader("Connection", "keep-alive");

    int httpResponseCode = -1;
    httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    String payload = http.getString();
    Serial.println(payload);
    http.end();
 
 
}

void addNewBatteryToStation(int currentStation, String rfid, String metaABI,  const char *contractAddr)
{
    WiFiClientSecure client;
    client.setInsecure();
    String url = String(serverName) + "addBatteryStation";

    // mdns_init ();
    // MDNS.queryHost (url);

    client.connect(url.c_str(), 443);
    HTTPClient http;
    Serial.println("connecting to server "+ url);
    http.begin(client, url);

    http.addHeader("Content-Type", "application/json");
    http.addHeader("Connection", "keep-alive");

    int httpResponseCode = -1;
    String postBody = "{\"currentStation\": " + String(currentStation) + ", \"rfid\": \"" + rfid + "\", \"abi\": \"" + metaABI + "\"}";
    Serial.println(postBody);
    httpResponseCode = http.POST(postBody.c_str());
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    http.end();
}

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