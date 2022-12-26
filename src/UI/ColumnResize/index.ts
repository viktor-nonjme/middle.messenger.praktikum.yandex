import './index.scss';

import template from './index.template';

import Block from '../../utils/Block';

export default class ColumnResize extends Block {
  constructor(props = {}) {
    super({
      ...props,
      events: {
        mousedown: (event: MouseEvent) => {
          const element = event.target as HTMLElement;

          let page: HTMLElement | null = element.closest('.container-grid');

          if (page) {
            // console.log('page 1', page);
            page.addEventListener('mousemove', (e: MouseEvent) => {
              // console.log('page 2', page);
              if (page) {
                page!.style.gridTemplateColumns = `${e.pageX}px 6px 1fr`;
              }
            });

            page.addEventListener('mouseup', () => {
              page = null;
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
