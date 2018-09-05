interface SlimElement extends HTMLElement {
  new() : SlimElement
  _render(...args) : void
  _$(target:any):any
}

const Slim = <SlimElement>window['Slim']

// noinspection TypeScriptValidateTypes
export class Component extends Slim {

  _render (tpl) : void {
    // noinspection TypeScriptUnresolvedFunction
    super._render(tpl)
    const { sharedStyles } = <any>this.constructor
    if (sharedStyles) {
      const styleNode = document.createElement('style')
      styleNode.textContent = (<HTMLElement>sharedStyles).textContent
      // noinspection TypeScriptUnresolvedFunction
      const root = Slim._$(this).rootElement
      if (root.children.length) {
        root.insertBefore(styleNode, root.children[0]);
      }
    }
  }

  public emit (name, data) {
    (<HTMLElement>this).dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: data
    }))
  }

  public on (name : string, callback : Function) : Function {
    this.addEventListener(name, (event : CustomEvent) => {
      (<Function>callback)(event.detail, event)
    })
    return () => {
      this.removeEventListener(name, <EventListenerOrEventListenerObject>callback)
    }
  }

  static get injections () : Object | null {
    return null;
  }

}