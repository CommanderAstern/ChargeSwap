#include <WiFi.h>
#include <SPI.h>
#include <MFRC522.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>


#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define SS_PIN  5  // ESP32 pin GIOP5 
#define RST_PIN 27 // ESP32 pin GIOP27 

MFRC522 rfid(SS_PIN, RST_PIN);

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


#include <HTTPClient.h>

const char *ssid = "Asim";
const char *password = "ilikewater";
#define MY_ADDRESS "0xB7E99669e9eDdD2975511FBF059d01969f43D409"      //Put your wallet address here
#define BATTERYCONTRACT  "0xFeaD5cd27A7AF5cbeD9bAd737c5Fb70A9c066DEE"  //Put your ERC20 contract address here
#define ETHERSCAN_TX "https://mumbai.polygonscan.com/tx/"

// Copy/paste the private key from MetaMask in here
const char *PRIVATE_KEY = "a12e71ebe9a4bc009a99f6b0a99c8f24163ce13d39979100adb2a1a74c7519b7"; //32 Byte Private key 

const char* serverName = "https://restpolygon.asimjawahir.repl.co/";
int wificounter = 0;
void setup_wifi();
void addNewBatteryToStation(int currentStation, String rfid, String metaABI,  const char *contractAddr);
String getBatteryInfo(const char * rfid);
void displayBatteryInfo(String json);
void scan(String user);
void setup() {
    Serial.begin(115200);
    // Add
    setup_wifi();
//    Serial.println(getBatteryInfo("e510b430"));
    Serial.begin(115200);
  
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
      Serial.println(F("SSD1306 allocation failed"));
      for(;;);
    }
    delay(1000);
     
    display.clearDisplay();
    
    // Init SPI bus
    SPI.begin();
  
    // Initialize MFRC522
    rfid.PCD_Init();
    
    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.print("Scan RFID for info please");
    display.display();
}

void loop() {
//      displayBatteryInfo(getBatteryInfo("e510b430"));
//      
//      delay(2000);
  // Look for new cards
  if (rfid.PICC_IsNewCardPresent()) { 
    // Read the card
    if (rfid.PICC_ReadCardSerial()) {
      // print UID in hex
      Serial.print("UID:");
      String UID = "";
      for (int i = 0; i < rfid.uid.size; i++) {
        UID += String(rfid.uid.uidByte[i], HEX);
      }
      
       Serial.println(UID);
      // Serial.println();
      
      displayBatteryInfo(getBatteryInfo(UID.c_str()));
      // halt PICC
      rfid.PICC_HaltA();
      // stop encryption on PCD
      rfid.PCD_StopCrypto1(); 
    }
  }
}
void displayBatteryInfo(String json)
{
    int index = 0;
    String parts[7];
    for (int i = 0; i < json.length(); i++) {
      if (json[i] == ',') {
        index++;
      } else {
        if (json[i] == '[' || json[i] == ']' || json[i] == '\"'|| json[i] == ' ')
        {
          continue;
         }
          parts[index] += json[i];
      }
    }
    display.clearDisplay();
  
    display.setTextSize(1);
    display.setTextColor(WHITE);
      
    // print everything in parts
    for (int i = 0; i < 7; i++) {
      Serial.print(parts[i]);
      Serial.print(" ");
      Serial.println();
    }
    
    if(parts[3] == "0")
    {
      display.setCursor(0, 10); 
      display.print("Battery ID: "+parts[0]);
      
      display.setCursor(0, 20); 
      display.print("Capacity: "+parts[1]+"%");
      
      display.setCursor(0, 30); 
      display.print("Status: Idle");
      
      display.setCursor(0, 40); 
      display.print("Station: "+parts[4]);
      display.display(); 
    }
    else
    {
      display.setCursor(0, 10); 
      display.print("Battery ID: "+parts[0]);
      
      display.setCursor(0, 20); 
      display.print("Capacity: "+getBatteryPercent(parts[0])+"%");
    
      display.setCursor(0, 30); 
      display.print("Status: InUse");
      
      display.setCursor(0, 40); 
      display.print("User: "+parts[5]);
      display.display(); 
      scan(parts[5]);
    }
    
 }
void scan(String user)
{
    WiFiClientSecure client;
    client.setInsecure();
    String url = String(serverName) + "scan";

    // mdns_init ();
    // MDNS.queryHost (url);

    client.connect(url.c_str(), 443);
    HTTPClient http;
    Serial.println("connecting to server "+ url);
    http.begin(client, url);

    http.addHeader("Content-Type", "application/json");
    http.addHeader("Connection", "keep-alive");

    int httpResponseCode = -1;
    String postBody = "{\"user\": " + String(user) + "\"}";
    Serial.println(postBody);
    httpResponseCode = http.POST(postBody.c_str());
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
}

String getBatteryInfo(const char * rfid)
{
     display.clearDisplay();
  
    display.setTextSize(2);
    display.setTextColor(WHITE);
    display.setCursor(0, 30); 
    display.print("Loading...");
    display.display(); 

    
    WiFiClientSecure client;
    client.setInsecure();
    String url = String(serverName) + "getBatteryDetailsRFID?rfid=" + String(rfid);
    client.connect(url.c_str(), 443);
    HTTPClient http;
    Serial.println("connecting to server "+ url);
    http.begin(client, url);

    int httpResponseCode = -1;
    httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    String payload = http.getString();
//    Serial.println(payload); 

    http.end();
    Serial.println("End");

    return payload;
}

String getBatteryPercent(String id)
{
    WiFiClientSecure client;
    client.setInsecure();
    String url = String(serverName) + "getBatteryPercent?battery_id=" + id;
    client.connect(url.c_str(), 443);
    HTTPClient http;
    Serial.println("connecting to server "+ url);
    http.begin(client, url);

    int httpResponseCode = -1;
    httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    String payload = http.getString();
  //    Serial.println(payload); 

    http.end();
    Serial.println("End");

    return payload;
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
