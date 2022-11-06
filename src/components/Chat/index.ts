import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';
import FormSendMessage from '../FormSendMessage';

type ChatMessagesProps = {
    id: string,
    type: string,
    text: string,
    date: string,
    onClick?: () => void
}

export default class Chat extends Block {
  protected formValues: Record<string, string | number> = {};

  constructor(props: ChatMessagesProps[] | any) {
    const formSendMessage = new FormSendMessage();

    super({
      formSendMessage,
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
