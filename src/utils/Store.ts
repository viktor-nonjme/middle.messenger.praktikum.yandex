import EventBus from './EventBus';

import { deepParseJson, set } from './helpers';

import { StoreInterface } from '../types/index';

class Store extends EventBus {
  private state: StoreInterface = {
    isAuth: false,
    user: null,
    emptyChat: true,
    selectedUser: null,
    currentChat: null,
    messages: {},
    chats: [],
  };

  public initState() {
    localStorage.setItem('store', JSON.stringify(this.state));

    this.emit('updated-store', this.state);
  }

  public getState() {
    const store = localStorage.getItem('store');
    if (store) {
      return deepParseJson(store);
    }
    return {};
  }

  public removeState() {
    this.state = {
      isAuth: false,
      user: null,
      emptyChat: true,
      selectedUser: null,
      currentChat: null,
      messages: {},
      chats: [],
    };

    localStorage.removeItem('store');
  }

  public set(path: string, value: unknown) {
    this.state = this.getState();

    const newState = set(this.state, path, value);

    localStorage.setItem('store', JSON.stringify(newState));

    this.emit('updated-store', newState);
  }
}

export default new Store();
