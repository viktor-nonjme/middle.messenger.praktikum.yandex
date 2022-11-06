import Block from '../../utils/Block';
import './index.scss';
import template from './index.template';

type MessagesListProps = {
    id: string,
    name: string,
    text: string,
    date: string,
    notification: number,
    onClick?: () => void
}

export class MessagesList extends Block {
  constructor(props: MessagesListProps[] | any) {
    super({
      ...props,
      events: {
        click: props.messages.forEach((element: Record<string, any>) => {
          // eslint-disable-next-line no-unused-expressions
          element.onClick;
        }),
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
