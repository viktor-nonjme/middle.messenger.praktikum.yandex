import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

import ProfileService from '../../services/profile';

import Button from '../../UI/Button';

import { TProps } from '../../types';

export default class FormAvatar extends Block {
  constructor(props: TProps) {
    const button = new Button({
      type: 'submit',
      title: 'Поменять аватар',
      isDisabled: 'disabled',
      disabledClassName: 'button-primary-disabled',
      className: 'button-avatar',
    });

    super({
      ...props,
      button,
      events: {
        change: (event: Event) => {
          const inputFile = event.target as HTMLInputElement;
          const { files } = inputFile;
          if (files) {
            const reader = new FileReader();

            reader.readAsDataURL(files[0]);

            reader.onload = function onload() {
              const avatarImg = inputFile.previousElementSibling;

              avatarImg!.setAttribute('src', reader.result as string);

              button.setProps({
                isDisabled: '',
                disabledClassName: '',
              });
            };

            reader.onerror = function onerror() {
              console.log(reader.error);
            };
          } else {
            button.setProps({
              isDisabled: 'disabled',
              disabledClassName: 'button-primary-disabled',
            });
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          ProfileService.editAvatar(formData);
          button.setProps({
            isDisabled: 'disabled',
            disabledClassName: 'button-primary-disabled',
          });
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
