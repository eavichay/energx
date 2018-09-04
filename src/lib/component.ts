const Slim = window['Slim']

// noinspection TypeScriptValidateTypes
export class Component extends Slim {

  protected _render (tpl) : void {
    // noinspection TypeScriptUnresolvedFunction
    super._render(tpl)
    const { sharedStyles } = <any>this.constructor
    if (sharedStyles) {
      const styleNode = document.createElement('style')
      styleNode.textContent = (<HTMLElement>sharedStyles).textContent
      Slim._$(this).rootElement.appendChild(styleNode);
    }
  }

  static get injections () : Object | null {
    return null;
  }

}