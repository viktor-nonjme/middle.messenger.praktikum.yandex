import request from '../utils/HTTPTransport';

class AuthApi {
  signin(data: XMLHttpRequestBodyInit) {
    return request.post('auth/signin', { headers: { 'Content-Type': 'application/json' }, data });
  }

  signup(data: XMLHttpRequestBodyInit) {
    return request.post('auth/signup', { headers: { 'Content-Type': 'application/json' }, data });
  }

  me() {
    return request.get('auth/user', { headers: { 'Content-Type': 'application/json' } });
  }

  logout() {
    return request.post('auth/logout', { headers: { 'Content-Type': 'application/json' } });
  }
}

export default new AuthApi();
