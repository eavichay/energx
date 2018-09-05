import {tag, template, useShadow} from "slim-js/Decorators";
import sharedStyles from "../../lib/shared-styles";
import {SharedStylesRegistry} from "../shared-styles-registry";
import {Component} from "../../lib/component";

interface Animation extends EventTarget {
  onfinish: Function;
}

@tag('app-notifications')
@template(`
<style>
    :host {
        position: fixed;
        padding: 1rem;
        top: 0;
    }
</style>
<div s:if="message" class="alert alert-danger">{{message}}</div>
`)
@useShadow(true)
@sharedStyles(SharedStylesRegistry.BOOTSTRAP)
class AppNotifications extends Component {

  private message : string

  onCreated () {
    const app = <Component>document.querySelector('app-demo')
    if (!window['app-ready']) {
      window.addEventListener('app-ready', () => {
        this.initialize()
      })
    } else {
      this.initialize()
    }
  }

  // noinspection TypeScriptValidateTypes
  initialize () {
    const app = <Component>document.querySelector('demo-app')
    app.on('user-action', ({type, employee}) => {
      // noinspection TypeScriptValidateTypes
      this.message = `Notification: ${type} ${employee.name}`;
      (<any>this).animate(
        [{
          opacity: 1
        },
        {
          opacity: 0
        }], {
          delay: 2000,
          duration: 1000
        }).onfinish = () => {
        this.message = null
        this.style.opacity = '1'
      }
    })
  }

}