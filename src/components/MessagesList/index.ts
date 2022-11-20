import Block from '../../utils/Block';
import './index.scss';
import template from './index.template';

type MessagesListProps = { [key: string]: string };

export class MessagesList extends Block {
  constructor(props: MessagesListProps[] | any) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
