import { TProps } from '../types';
import Block from './Block';
import store from './Store';

export function connect(Component: typeof Block, mapStateToProps: (state: any) => TProps) {
  return class extends Component {
    constructor(props = {}) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on('updated-store', () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
