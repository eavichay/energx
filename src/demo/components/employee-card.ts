import {tag, template, useShadow} from "slim-js/Decorators";
import {Component} from "../../lib/component";
import {Employee} from "../model/employee";
import sharedStyles from "../../lib/shared-styles";
import {SharedStylesRegistry} from "../shared-styles-registry";

@tag('employee-card')
@sharedStyles(SharedStylesRegistry.BOOTSTRAP)
@template(`
<style>
    :host {
        display: inline-flex;
        margin: 0;
        padding: 0;
    }
    
    div {
        display: inline-flex;
        flex-direction: column;
    }
    
    #title {
        padding: 0.5rem;
        display: block;
        text-align: center;
        background: limegreen;
    }
    
    .container[is-registered="true"] #title {
        text-align: left;
    }
    
    #employee-id {
        font-size: 8px;
    }
    
    #actions {
        flex-direction: row-reverse;
        padding: 0.5rem;
    }
    
    #content {
        flex-direction: row;
        padding: 0.5rem;
    }
    
    #title h5 {
        margin: 0;
        line-height: 1.5rem;
        font-size: {{computeTitleFontSize(isRegistered)}}
    }
    
    img {
        border: 1px solid black;
        margin-right: 1rem;
        border-radius: 50%;
        width: 74px;
        height: 74px;
    }
    
    *[cap] {
        text-transform: capitalize;
    }
    
    .container {
        width: 100%;
        padding: 0;
        height: 12rem;
        transition: 0.3s ease-in-out all;
        width: 20rem;
        border-radius: 0.5rem;
        font-size: 12px;
        overflow: hidden;
        background: skyblue;
    }
    
    .btn {
        max-width: 5rem;
    }
    
    button.btn {
        height: 1.5rem;
        line-height: 1rem;
    }
    
    #actions[is-registered="true"] > #register {
        display: none;
    } 
    
    #actions[is-registered="true"] > #unregister{
      top: -55px;
    }
    
    #actions[is-registered="false"] > #unregister {
        display: none
    }
    
    #unregister {
        position: relative;
        top: 0;
    }
    
    .container[is-registered="true"] {
        height: 2.5rem;
    }
</style>
<div class="container" bind:is-registered="isRegistered">
  <div id="title"><h5 cap>{{data.name}}</h5></div>
  <div id="employee-id">{{data.id}}</div>
  <div id="content">
      <img width="74" height="74" bind:src="data.pictureUrl">
      <div id="details">
          <span>{{data.phone}}</span>
          <span>{{data.email}}</span>
          <span cap>{{data.address}}</span>
      </div>
  </div>
  <div id="actions" bind:is-registered="isRegistered">
    <button id="register" click="registerEmployee" class="btn btn-sm btn-primary">Register</button>
    <button id="unregister" click="unregisterEmployee" class="btn btn-sm btn-cancel">Unregister</button>
  </div>
</div>
`)
@useShadow(true)
class EmployeeCard extends Component {

  public data : Employee
  private isRegistered : boolean = false

  public registeredEmployees : Employee[]

  private computeTitleFontSize (value) {
    return value ? '0.8rem' : '1rem'
  }

  private registerEmployee () {
    this.emit('register-employee', this.data)
    this.isRegistered = this.data.isRegistered
  }

  private unregisterEmployee () {
    this.emit('unregister-employee', this.data)
    this.isRegistered = this.data.isRegistered
  }

}