import Block from './Block';

export default function renderDOM(query: string, block: Block) {
  const root: Element | null = document.querySelector(`#${query}`);

  const node = block.getContent();

  if (root && node) {
    root.appendChild(node);

    block.dispatchComponentDidMount();
  }

  return root;
}
