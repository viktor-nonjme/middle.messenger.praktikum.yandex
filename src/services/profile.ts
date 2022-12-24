import ProfileApi from '../api/profile';

import Store from '../utils/Store';
import Block from '../utils/Block';

import FormAvatar from '../components/FormAvatar';
import ChatList from '../components/ChatList';

import Spinner from '../UI/Spinner';
import Tooltip from '../UI/Tooltip';

import { TProps } from '../types';

import { BASE_URL_RESOURCES } from '../consts';

class ProfileService {
  public editProfile(data: XMLHttpRequestBodyInit) {
    Spinner.setProps({ isHidden: false });

    ProfileApi.editProfile(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: 'Вы успешно редактировали пользователя' });

          Store.set('user', JSON.parse(result.response));
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }

  public editAvatar(data: XMLHttpRequestBodyInit) {
    Spinner.setProps({ isHidden: false });

    ProfileApi.editAvatar(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: 'Вы успешно поменяли аватарку' });

          const formAvatar = new FormAvatar({});

          formAvatar.setProps({ avatar: BASE_URL_RESOURCES + JSON.parse(result.response).avatar });
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
        return result;
      })
      .then((result) => {
        Store.set('user', JSON.parse(result.response));
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }

  public editPassword(data: XMLHttpRequestBodyInit, inputs: TProps) {
    Spinner.setProps({ isHidden: false });

    ProfileApi.editPasssword(data)
      .then((result) => {
        if (result.status === 200) {
          Tooltip.setProps({ type: 'success', text: 'Вы успешно поменяли пароль' });

          Object.values(inputs).forEach((element) => {
            if (element.props.value !== undefined) {
              element.setProps({ value: '', error: '' });
            }
          });
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }

  public searchUserByLogin(data: string, Component?: Block) {
    Spinner.setProps({ isHidden: false });

    ProfileApi.searchUserByLogin(data)
      .then((result) => {
        if (result.status === 200) {
          const users = JSON.parse(result.response);

          const isNotFoundUser = users.length === 0;

          if (Component) {
            Component.setProps({
              isUsers: true,
              users,
              isNotFoundUser,
            });
          } else {
            ChatList.setProps({
              isUsers: true,
              isChats: false,
              users,
              isNotFoundUser,
            });
          }
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }

  public findUserById(id: string) {
    Spinner.setProps({ isHidden: false });

    ProfileApi.findUserById(id)
      .then((result) => {
        if (result.status === 200) {
          const user = JSON.parse(result.response);

          const displayName = `${user.first_name} ${user.second_name}`;

          Store.set('emptyChat', false);

          Store.set('currentChat', null);

          Store.set('selectedUser', {
            id: user.id,
            display_name: displayName,
            avatar: user.avatar,
          });
        } else {
          Tooltip.setProps({ type: 'warning', text: `Произошла ошибка: ${JSON.parse(result.responseText).reason}` });
        }
      })
      .catch((error) => {
        Tooltip.setProps({ type: 'warning', text: 'Произошла ошибка' });

        Store.set('emptyChat', true);

        console.log('error', error);
      })
      .finally(() => {
        Spinner.setProps({ isHidden: true });
      });
  }
}

export default new ProfileService();
