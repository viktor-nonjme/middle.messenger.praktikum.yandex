import AuthApi from '../api/auth';

import Store from '../utils/Store';
import Router from '../utils/Router';

import Tooltip from '../UI/Tooltip';

import { TProps } from '../types';

import ChatService from './chat';
import MessagesService from './messages';

class AuthService {
  public signup(data: XMLHttpRequestBodyInit, inputs: TProps) {
    AuthApi.signup(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: `Вы успешно зарегистрированы. ID: ${JSON.parse(result.responseText).id}` });

          Object.values(inputs).forEach((element) => {
            if (element.props.value !== undefined) {
              element.setProps({ value: '', error: '' });
            }
          });

          setTimeout(() => {
            Router.go('/messenger');
          }, 1200);
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка 😔😔' });

        console.log('error', error);
      });
  }

  public signin(data: XMLHttpRequestBodyInit, inputs: TProps) {
    AuthApi.signin(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: 'Вы успешно вошли' });

          Object.values(inputs).forEach((element) => {
            if (element.props.value !== undefined) {
              element.setProps({ value: '', error: '' });
            }
          });

          setTimeout(() => {
            Router.go('/messenger');
          }, 1200);
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка 😔😔' });

        console.log('error', error);
      });
  }

  public getUser() {
    AuthApi
      .me()
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          Store.initState();

          Store.set('user', JSON.parse(data.response));

          Store.set('isAuth', true);

          ChatService.getChats();
        } else {
          const { isAuth } = Store.getState();

          if (isAuth) {
            Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(data.responseText).reason}. Войдите заново в систему` });
          }

          Store.initState();
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка 😔😔' });

        console.log('error', error);
      });
  }

  public logout() {
    AuthApi
      .logout()
      .then(() => {
        Router.go('/');

        MessagesService.close();

        Store.removeState();
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка 😔😔' });

        console.log('error', error);
      });
  }
}

export default new AuthService();
