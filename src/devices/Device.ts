
import rc from "random-coordinates";

export interface IObserver<T> {
  update(message: T): void;
}

export interface ISubject<T> {
  addObserver(obs: IObserver<T>): void;
  removeObserver(obs: IObserver<T>): void;
  notify(): void;
}

export interface DeviceInformation {
  id: number;
  location: string;
  locked: boolean;
  name: string;
  power: "on" | "off";
  speed: number;
  timestamp: Date;
}

export default class Device implements ISubject<DeviceInformation> {
  private power: boolean = false;
  private locked: boolean = false;
  private speed: number = Math.floor(Math.random() * 120);
  private location: string = rc();
  private observers: Array<IObserver<DeviceInformation>> =  [];
  constructor(public id: number, private name: string, { readingInterval = 5000 }: { readingInterval: number }) {
    setInterval(() => {
      this.location = rc();
      this.speed = Math.floor(Math.random() * 120);
      this.notify();
    }, readingInterval);
  }

  public switchPower(): void {
    this.power = !this.power;
  }

  public switchLock(): void {
    this.locked = !this.locked;
  }

  public isEnabled(): boolean {
    return this.power;
  }

  public getId() {
    return this.id;
  }

  public removeObserver(obs: IObserver<DeviceInformation>) {
    this.observers = this.observers.filter(o => o !== obs);
  }

  public addObserver(obs: IObserver<DeviceInformation>) {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  }
  public notify() {
    const data: DeviceInformation = {
      id: this.id,
      location: this.location,
      locked: this.locked,
      name: this.name,
      power: this.power ? "on" : "off",
      speed: this.speed,
      timestamp: new Date(),
    }
    for (const obs of this.observers) {
      obs.update(data);
    }
  }
}
