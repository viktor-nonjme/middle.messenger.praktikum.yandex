import EventBus from './EventBus';

export default class WSTransport extends EventBus {
  socket: WebSocket;

  pingInterval: number = 5000;

  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.addEvents();

    this.ping();

    return new Promise((resolve, reject) => {
      this.on('websoket-opened', () => {
        resolve();
      });

      this.on('websoket-closed', () => {
        reject();
      });
    });
  }

  send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }

  ping() {
    const ping = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingInterval);

    this.on('websoket-closed', () => {
      clearInterval(ping);
      this.pingInterval = 0;
    });
  }

  addEvents() {
    this.socket.addEventListener('open', () => {
      this.emit('websoket-opened');
    });

    this.socket.addEventListener('close', () => {
      this.emit('websoket-closed');
    });

    this.socket.addEventListener('error', (error) => {
      this.emit('websoket-error', error);
    });

    this.socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      if (data.type === 'user connected') {
        return;
      }

      this.emit('websoket-message', data);
    });
  }
}
