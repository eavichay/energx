import {tag, template, useShadow} from "slim-js/Decorators";
import sharedStyles from "../../lib/shared-styles";
import {SharedStylesRegistry} from "../shared-styles-registry";
import {Component} from "../../lib/component";
import {Employee} from "../model/employee";
import {HTMLDialogElement} from "../app";

@tag('info-card')
@template(`
  <style>
    h1 {
      text-transform: capitalize;
    }
  </style>
  <h1>{{data.name}}</h1>
  <div id="email">{{data.email}}</div>
  <div id="address">{{data.address}}</div>
  <div id="phone">{{data.phone}}</div>
  <div id="actions">
    <button click="close" class="btn btn-dark">Close</button>
    <popup-menu>
      <button slot="trigger" class="btn btn-primary">More options...</button>
      <li>Fire employee</li>
      <li>Email employee</li>
    </popup-menu>
  </div>
`)
@useShadow(true)
@sharedStyles(SharedStylesRegistry.BOOTSTRAP)
class InfoCard extends Component {

  private data : Employee

  private close () {
    (<HTMLDialogElement>this.parentElement).close();
  }

}