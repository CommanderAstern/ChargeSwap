#include <SPI.h>
#include <MFRC522.h>
#include <string>
#define SS_PIN  5  // ESP32 pin GIOP5 
#define RST_PIN 27 // ESP32 pin GIOP27 

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {

  // Initialize serial communications with the PC
  Serial.begin(9600);

  // Init SPI bus
  SPI.begin();

  // Initialize MFRC522
  rfid.PCD_Init();
}

void loop() {

  // Look for new cards
  if (rfid.PICC_IsNewCardPresent()) { 
    // Read the card
    if (rfid.PICC_ReadCardSerial()) {
      // Print the Card Type
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // print UID in hex
      Serial.print("UID:");
      String UID = "";
      for (int i = 0; i < rfid.uid.size; i++) {
        UID += String(rfid.uid.uidByte[i], HEX);
      }
      
      Serial.print(UID);
      Serial.println();
      rfid.PICC_HaltA(); // halt PICC
      rfid.PCD_StopCrypto1(); // stop encryption on PCD
    }
  }
}