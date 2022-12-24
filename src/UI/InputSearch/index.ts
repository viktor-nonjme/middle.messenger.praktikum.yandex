import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

import Popup from '../../components/Popup';

import ProfileService from '../../services/profile';

export default class InputSearch extends Block {
  constructor(props = {}) {
    super({
      ...props,
      events: {
        input: (event: Event) => {
          const element = event.target as HTMLInputElement;
          const login = element.value;
          ProfileService.searchUserByLogin(JSON.stringify({ login }));
        },
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains('messages-list-input-button')
            || (event.target! as Element).classList.contains('messages-list-input-svg')
            || (event.target! as Element).classList.contains('messages-list-input-svg-path')) {
            Popup.setProps({ isOpened: true });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
