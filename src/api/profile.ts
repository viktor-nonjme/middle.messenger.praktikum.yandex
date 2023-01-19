import request from '../utils/HTTPTransport';

class ProfileApi {
  public editProfile(data: XMLHttpRequestBodyInit) {
    return request.put('user/profile', { headers: { 'Content-Type': 'application/json' }, data });
  }

  public editAvatar(data: XMLHttpRequestBodyInit) {
    return request.put('user/profile/avatar', { data });
  }

  public editPasssword(data: XMLHttpRequestBodyInit) {
    return request.put('user/password', { headers: { 'Content-Type': 'application/json' }, data });
  }

  public searchUserByLogin(data: string) {
    return request.post('user/search', { headers: { 'Content-Type': 'application/json' }, data });
  }

  public findUserById(id: string) {
    return request.get(`user/${id}`);
  }
}

export default new ProfileApi();
