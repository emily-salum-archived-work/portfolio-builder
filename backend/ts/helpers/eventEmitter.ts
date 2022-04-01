

class EventEmitter {

  events: any;

  constructor() {
    this.events = {};
  }
  on(event: string, listener: Function) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }
  removeListener(event: string, listener: Function) {
    if (typeof this.events[event] === 'object') {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] === 'object') {
      this.events[event].forEach((listener: Function) => listener.apply(this, args));
    }
  }
  once(event: string, listener: Function) {
    const remove = this.on(event, (...args: any[]) => {
      remove();
      listener.apply(this, args);
    });
  }
};


export default EventEmitter;