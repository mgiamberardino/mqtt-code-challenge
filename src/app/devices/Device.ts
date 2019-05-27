import { useState, useEffect } from "react";
import mqttConnector from '../lib/MQTTConnector';

export interface Device {
  id: number;
  location: string;
  locked: boolean;
  name: string;
  power: 'on' | 'off';
  speed: number;
  timestamp?: Date;
}
const initialValues: Device = {
  id: 0,
  location: 'No Data',
  locked: false,
  name: 'No Data',
  power: 'off',
  speed: 0,
}

function switchPower(device: Device) {
  mqttConnector.publish(`device/${device.id}/cmd`, 'POWER');
}

function switchLock(device: Device) {
  mqttConnector.publish(`device/${device.id}/cmd`, 'LOCK');
}

/**
 * Use device is a hook returning the device information updated from
 * the `status` topic and also two methods. The first method is to switch
 * the device lock and the second one to switch the device power.
 * 
 * @param id Device identificator
 * @returns {Array} [device, switchLock, switchPower] 
 */
export function useDevice(id: number): [Device, Function, Function] {
  const [device, setDevice] = useState(initialValues);
  const topic = `device/${id}/status`;
  useDeviceSubscription(topic, setDevice);
  return [device, () => switchLock(device), () => switchPower(device)];
}

function useDeviceSubscription(topic, messageHandler) {
  useEffect(() => {
    mqttConnector.subscribe(topic);
    function handleMessage(messageTopic: string, message: Buffer) {
      if (messageTopic === topic) {
        messageHandler(JSON.parse(message.toString()));
      }
    }
    mqttConnector.on('message', handleMessage);
    return () => {
      mqttConnector.unsubscribe(topic);
      mqttConnector.removeListener('message', handleMessage);
    };
  }, [topic]);
}