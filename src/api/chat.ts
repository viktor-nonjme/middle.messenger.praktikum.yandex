import request from '../utils/HTTPTransport';

class ChatApi {
  createChat(data: XMLHttpRequestBodyInit) {
    return request.post('chats', { headers: { 'Content-Type': 'application/json' }, data });
  }

  addUserToChat(data: XMLHttpRequestBodyInit) {
    return request.put('chats/users', { headers: { 'Content-Type': 'application/json' }, data });
  }

  getCommonChat(id: string) {
    return request.get(`chats/${id}/common`);
  }

  getChats() {
    return request.get('chats');
  }

  getChatToken(id: string) {
    return request.post(`chats/token/${id}`, { headers: { 'Content-Type': 'application/json' } });
  }

  getCountNewMessages(id: string) {
    return request.post(`chats/new/${id}`, { headers: { 'Content-Type': 'application/json' } });
  }

  deleteChat(data: XMLHttpRequestBodyInit) {
    return request.delete('chats', { headers: { 'Content-Type': 'application/json' }, data });
  }
}

export default new ChatApi();
