import {tag, template, useShadow} from "slim-js/Decorators";
import sharedStyles from "../../lib/shared-styles";
import {SharedStylesRegistry} from "../shared-styles-registry";
import {Component} from "../../lib/component";

@tag('popup-menu')
@template(`
<style>
    :host(:not([open])) #content {
        display: none
    }
    
    :host ::slotted(li) {
        list-style-type: none;
        margin: 0;
        line-height: 2.5rem;
    }
    
    :host ::slotted(:not(li)) {
        display: none;
    }
    
    :host ::slotted(li:hover) {
        background: lightcyan;
    }
    
    :host {
        position: static;
    }
    
    #content {
        width: fit-content;
        display: inline-flex;
        padding: 0.5rem;
        margin: 0;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        position: absolute;
        flex-direction: column;
    }
    
</style>
<span mouseup="close" id="container">
    <span mousedown="open" id="trigger">
        <slot name="trigger"></slot>    
    </span>
    <ul id="content">
      <slot></slot>
    </ul>
</span>
`)
@useShadow(true)
@sharedStyles(SharedStylesRegistry.BOOTSTRAP)
class PopupMenu extends Component {

  private open () {
    this.setAttribute('open', null)
  }

  private close ({target}) {
    if ((<HTMLElement>target).localName === 'li') {
      this.emit('option-selected', target)
    }
    this.removeAttribute('open')
  }

}