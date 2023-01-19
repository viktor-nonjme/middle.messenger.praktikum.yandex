import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  const hbs = `
    <div class="test">
      <h1 class="test-title">
        {{ title }}
      </h1>
    </div>
  `;

  const tagName = 'DIV';

  const props = { title: 'title' };

  class Component extends Block {
    render() {
      return this.compile(hbs);
    }
  }

  const getComponent = () => new Component(props);

  it('should render an element', () => {
    expect(getComponent().element?.tagName).to.eq(tagName);
  });

  it('should render correct props', () => {
    expect(getComponent().element?.textContent?.trim()).to.equal(props.title);
  });
});
