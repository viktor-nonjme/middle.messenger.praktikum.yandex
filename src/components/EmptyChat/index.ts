import './index.scss';
import template from './index.template';
import Block from '../../utils/Block';

export default class EmptyChat extends Block {
  render() {
    return this.compile(template);
  }
}
