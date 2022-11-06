import '../../styles/error.scss';
import '../../styles/container.scss';
import template from './index.template';
import Block from '../../utils/Block';

export class ServerError extends Block {
  render() {
    return this.compile(template);
  }
}
