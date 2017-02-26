/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */
#include <ESP8266WiFi.h>
#include "SocketIOClient.h"
#include <ArduinoJson.h>


StaticJsonBuffer<200> jsonBuffer;


SocketIOClient client;
const char* ssid     = "WiFi 174-56";
const char* password = "zesPazefa7";

char host[] = "192.168.1.146";
int port = 1234;
extern String RID;
extern String Rname;
extern String Rcontent;

unsigned long previousMillis = 0;
long interval = 100;//20;//00; miliseconds
unsigned long lastreply = 0;
unsigned long lastsend = 0;
//String JSON;
char dev_name[50];
#define RBT_ID         "RBT_%06X"
//JsonObject& root = jsonBuffer.createObject();

#define ns 1
//toggle name space

void setup() {
  sprintf(dev_name, RBT_ID, ESP.getChipId());
  pinMode(A0, INPUT);
  pinMode(12, OUTPUT); digitalWrite(12, LOW);
 // root["sensor"] = "gps";
//  root["time"] = 1351824120;
//  JsonArray& data = root.createNestedArray("data");
//  data.add(double_with_n_digits(48.756080, 6));
//  data.add(double_with_n_digits(2.302038, 6));
 
 // root.printTo(JSON);
  Serial.begin(115200);
  delay(10);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  digitalWrite(12, HIGH);
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

//#ifdef NS
//  if (!client.connect(host, port, dev_name)) {
//#else    
  if (!client.connect(host, port)) {    
//#endif    
  
    Serial.println("connection failed");
    return;
  }
if (client.connected())
  {
    client.send("connection", "message", "Connected !!!!");
  }
}

void loop() {
unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > interval)
  {
    previousMillis = currentMillis;
    client.heartbeat(0);
    

     unsigned int out = (unsigned int) analogRead(A0);
/*
    float voltage = out * (5.0 / 1023.0);
    Serial.println(voltage);
//    sprintf(voltage,"%c",out);
    sprintf(a0,"%s",voltage);
    //client.sendMessage(a0);
    client.send("atime", "message", "Time please?");
 */
  String aa = String(out);
  //client.sendMessage(aa);
 //   client.send("light", "message", aa);
   // root["time"] = aa;
   // Serial.println(JSON);
 //   client.send("atime", "message", "Time please?");
  //  root.printTo(JSON);
  //  client.sendJSON("JSON", JSON); 
 //    jsonBuffer = StaticJsonBuffer<200>(); Serial.println(JSON);

   String acc_data;
   StaticJsonBuffer<100> jsonDeviceStatus;
   JsonObject& jsondeviceStatus = jsonDeviceStatus.createObject();
    jsondeviceStatus["device_name"] = dev_name;
    jsondeviceStatus["x"]         = aa;
    jsondeviceStatus["y"]         = aa;
    jsondeviceStatus["z"]         = aa;
    jsondeviceStatus.printTo(acc_data);
    client.sendJSON("JSON", acc_data); 
    //Serial.println(acc_data);
    
    lastsend = millis();
  }
  if (client.monitor())
  {
    lastreply = millis(); 
  //  Serial.println(RID);
    if (RID == "atime" && Rname == "time")
    {
  //    Serial.print("Il est ");
  //    Serial.println(Rcontent);
    }
  }

 if (!client.connected()) {
    digitalWrite(12, LOW);
    //client.connect(host, port, dev_name);
    client.connect(host, port);
 }
 else
 {
   digitalWrite(12, HIGH);
 }
 
  
}

