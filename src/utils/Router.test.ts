import Router from './Router';
import Block from './Block';

const { expect } = require('chai');

describe('Router', () => {
  class Component extends Block {
    render() {
      return this.compile('<div>Component</div>');
    }
  }

  Router.use('/1', Component).use('/2', Component).start();

  it('should work adding new routes', () => {
    Router.use('/3', Component);

    expect(Router.routes.length).to.eq(3);
  });

  it('should work the go method', () => {
    Router.go('/2');

    expect(window.location.pathname).to.eq('/2');
  });
});
