import { expect } from 'chai';
import sinon from 'sinon';
import Link from './index';
import Router from '../../utils/Router';

describe('Link component', () => {
  it('element should return HTMLAnchorElement', () => {
    const link = new Link({ to: '/' });
    const { element } = link;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new Link({ to: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
