#include <ArduinoJson.h> --- use this library

--> payload = 42["arduino",{"message":"forward"}]

case WStype_TEXT:
{
Serial.printf("[WSc] get text: %s\n", payload);
String text = ((const char *)&payload[0]);
int pos = text.indexOf('{');
String json = text.substring(pos,text.length()-1);

    const size_t BUFFER_SIZE =
         JSON_OBJECT_SIZE(10)
         + MAX_CONTENT_SIZE;
     DynamicJsonBuffer jsonBuffer(BUFFER_SIZE);

     JsonObject& root = jsonBuffer.parseObject(json);
     String msg = root["message"];

 }
