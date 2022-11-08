import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';
import FormSendMessage from '../FormSendMessage';

type ChatMessagesProps = { [key: string]: string };

export default class Chat extends Block {
  protected formValues: Record<string, string | number> = {};

  constructor(props: ChatMessagesProps[] | any) {
    const formSendMessage = new FormSendMessage({ value: '', error: '' });

    super({
      formSendMessage,
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
