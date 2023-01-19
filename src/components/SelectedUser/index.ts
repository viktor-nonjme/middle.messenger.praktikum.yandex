import './index.scss';

import accountAvatar from '../../assets/images/account.png';

import template from './index.template';

import Block from '../../utils/Block';
import { connect } from '../../utils/connect';

import Button from '../../UI/Button';

import ChatService from '../../services/chat';

import { BASE_URL_RESOURCES } from '../../consts';

import { StoreInterface, TProps } from '../../types';

class SelectedUser extends Block {
  constructor(props: TProps) {
    const buttonStartChat = new Button(
      {
        className: 'button-start-chat',
        type: '',
        title: 'Начать чат',
        isDisabled: '',
        disabledClassName: '',
      },
      {
        click: async () => {
          await ChatService.createChat(JSON.stringify({ title: `${this.props.selectedUser.display_name} connecting... ${this.props.user.first_name} ${this.props.user.second_name}` }), [Number(this.props.selectedUser.id)]);
        },
      },
    );

    const buttonToChat = new Button({
      className: '',
      type: '',
      title: 'Чат',
      isDisabled: '',
      disabledClassName: '',
    });

    super({
      ...props,
      userAvatar: accountAvatar,
      baseUrl: BASE_URL_RESOURCES,
      buttonStartChat,
      buttonToChat,
      selectedUser: props.selectedUser,
      user: props.user,
    });
  }

  render() {
    return this.compile(template);
  }
}

function mapStateToProps(state: StoreInterface) {
  return {
    selectedUser: state.selectedUser,
    user: state.user,
  };
}

export default connect(SelectedUser, mapStateToProps);
