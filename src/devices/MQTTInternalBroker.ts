import { Client, connect } from "mqtt";

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://localhost";

class MQTTInternalBroker {
  private client: Client;
  private listeners: {[key: string]: Array<(msg: string) => void>} = {};
  constructor() {
    console.log('Tryng to connect with:', MQTT_HOST);
    let tries = 0;
    this.client = connect(MQTT_HOST);
    this.client.on("connect", (err: any) => {
      console.log(`MQTT Client connected successfully to ${MQTT_HOST}`);
    });
    this.client.on("error", (err: any) => {
      throw err;
    });
    this.client.on("reconnect", (err: any) => {
      if (tries === 3) {
        this.client.end();
        throw new Error(`Failed to connect to ${MQTT_HOST}`);
      }
      tries++
      console.log(`Reconnecting: ${tries}`);
    });
    this.client.on("message", this.handleMessage.bind(this));
  }
  public addMessageListener(topic: string, fn: (msg: string) => void) {
    if (!this.listeners[topic]) {
      this.listeners[topic] = [];
      this.client.subscribe(topic);
    }
    this.listeners[topic].push(fn);
  }
  public publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }
  private handleMessage(topic: string, message: Buffer): void {
    if (this.listeners[topic]) {
      for (const fn of this.listeners[topic]) {
        fn(message.toString());
      }
    }
  }
}

export default new MQTTInternalBroker();
