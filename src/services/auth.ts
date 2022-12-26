import AuthApi from '../api/auth';

import Store from '../utils/Store';

import ChatService from './chat';
import MessagesService from './messages';

import BaseService from './base';

import { TProps } from '../types';

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public signup(data: XMLHttpRequestBodyInit, inputs: TProps) {
    this.toggleSpinner(false);

    AuthApi.signup(data)
      .then((result) => {
        if (result.status === 200) {
          const successResponse = JSON.parse(result.responseText).id;

          this.displayTooltip('success', `Вы успешно зарегистрированы. ID: ${successResponse}`);

          this.clearForm(inputs);

          this.redurectTo('/messenger', 1200);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);

          if (errorReason === 'User already in system') {
            this.redurectTo('/messenger', 1200);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      })
      .finally(() => {
        this.toggleSpinner(true);
      });
  }

  public signin(data: XMLHttpRequestBodyInit, inputs: TProps) {
    this.toggleSpinner(false);

    AuthApi.signin(data)
      .then((result) => {
        if (result.status === 200) {
          this.displayTooltip('success', 'Вы успешно вошли');

          this.clearForm(inputs);

          this.redurectTo('/messenger', 1200);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          this.displayTooltip('warning', `Произошла ошибка: ${errorReason}`);

          if (errorReason === 'User already in system') {
            this.redurectTo('/messenger', 1200);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      })
      .finally(() => {
        this.toggleSpinner(true);
      });
  }

  public getUser() {
    AuthApi
      .me()
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          const userData = JSON.parse(data.response);

          Store.initState();

          Store.set('user', userData);

          Store.set('isAuth', true);

          ChatService.getChats();
        } else {
          const { isAuth } = Store.getState();

          const errorReason = JSON.parse(data.responseText).reason;

          if (isAuth) {
            this.displayTooltip('warning', `Произошла ошибка: ${errorReason}. Войдите заново в систему`);
          }

          Store.initState();
        }
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      });
  }

  public logout() {
    AuthApi
      .logout()
      .then(() => {
        this.redurectTo('/', 0);

        MessagesService.close();

        Store.removeState();
      })
      .catch((error) => {
        this.displayTooltip('warning', 'Произошла ошибка 😔😔');

        console.log('error', error);
      });
  }
}

export default new AuthService();
