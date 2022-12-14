import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

type Props = Record<string, any>;

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected _element: HTMLElement | null = null;

  protected readonly props: Props;

  children: Props;

  eventBus: () => EventBus;

  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(propsAndChildren?: Props) {
    propsAndChildren = propsAndChildren ?? {} as Props;
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    const eventBus = new EventBus();
    this.props = props;

    this.props = this._makePropsProxy(props || {} as Props);

    this.children = this._makePropsProxy(this.children);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _getChildren(propsAndChildren?: Props) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren as Props).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: Props) {
    this.componentDidMount(props);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line no-unused-vars
  componentDidMount(_props: Props) {
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment: any = this.render();
    this._removeEvents();
    const newElement = fragment.firstElementChild;
    this._element!.replaceWith(newElement);
    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  render() {}

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: Props): any {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('?????? ??????????????');
      },
    }) as unknown as Props;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as Props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _addEvents() {
    const { events } = this.props as Props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element!.addEventListener(eventName, events[eventName], true);
      }
    });
  }

  compile(tmpl: string): DocumentFragment {
    const propsAndStubs: any = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });
    const fragment = document.createElement('template');

    const template = Handlebars.compile(tmpl);
    fragment.innerHTML = template({
      ...this.props,
      children: this.children,
      refs: this.refs,
      ...propsAndStubs,
    });

    Object.entries(this.children).forEach(([, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const layoutContent = content.querySelector('[data-layout="1"]');
      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
