## MQTT Fullstack Code Challenge

This is a personal project created to solve a code challenge based on the following stack:
* Node
* React
* MQTT

This application simply shows a table with a list of devices and their status. On the other hand there is a node script running simulating the devices by sending messages to a mqtt broker.

### How to run: development

In order to run this application in development mode (The only one supported right now) you just need to clone the repo and run:
```
npm install
npm run dev
```

## Configuration

The only configuration available for this project is the url of the MQTT broker to conect to. By default is using `mqtt://localhost` as MQTT broker address and `ws://localhost:1884` as default mqtt websocket address but you can customize it using the env vars `MQTT_HOST` and `WS_MQTT_HOST`:
```
WS_MQTT_HOST="ws://your_host:ws_port" MQTT_HOST="mqtt://your_host" npm run dev

```

The front-end app is using `ws://localhost:1884` as default value for the mqtt websocket connection.

## Contributors

* Mauro Giamberardino

## License: MIT