import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import EventBus from './EventBus';

import { TProps } from '../types';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  public element: HTMLElement | null = null;

  public readonly props: TProps;

  children: TProps;

  eventBus: () => EventBus;

  public constructor(propsAndChildren?: TProps) {
    propsAndChildren = propsAndChildren ?? {} as TProps;

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();

    this.props = props;

    this.props = this._makePropsProxy(props || {} as TProps);

    this.children = this._makePropsProxy(this.children);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _getChildren(propsAndChildren?: TProps) {
    const children: TProps = {};
    const props: TProps = {};

    Object.entries(propsAndChildren as TProps).forEach(([key, value]) => {
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
    this.element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidMount() {

  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (JSON.stringify(oldProps) === JSON.stringify(newProps)) {
      return true;
    }
    return false;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get el() {
    return this.element;
  }

  _render() {
    const fragment: any = this.render();
    this._removeEvents();
    const newElement = fragment.firstElementChild;
    this.element!.replaceWith(newElement);
    this.element = newElement as HTMLElement;
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

  _makePropsProxy(props: TProps): any {
    const self = this;

    return new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as TProps;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as TProps;

    if (!events || !this.element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this.element) {
        this.element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _addEvents() {
    const { events } = this.props as TProps;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this.element) {
        this.element!.addEventListener(eventName, events[eventName], true);
      }
    });
  }

  protected compile(tmpl: string): DocumentFragment {
    const propsAndStubs: TProps = { ...this.props };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        propsAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const fragment = document.createElement('template');

    const template = Handlebars.compile(tmpl);

    fragment.innerHTML = template({
      children: this.children,
      ...propsAndStubs,
    });

    const replaceStub = (component: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
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
