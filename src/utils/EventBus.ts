export default class EventBus {
  listeners: Record<string, any>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: Function) => listener !== callback,
    );
  }
}
