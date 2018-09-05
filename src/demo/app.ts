import {Component} from "../index"
import {Employee} from "./model/employee"
import {EmployeeService} from "./service/employee"
import {tag, template, useShadow} from "slim-js/Decorators"

import './components/employee-card'
import './components/info-card'
import './components/popup-menu'
import './components/app-notifications'
import sharedStyles from "../lib/shared-styles";
import {SharedStylesRegistry} from "./shared-styles-registry";

export declare class HTMLDialogElement extends HTMLElement {
  showModal () : void
  close () : void
}

@tag('demo-app')
@sharedStyles(SharedStylesRegistry.BOOTSTRAP)
@template(`
<style>
    employee-card {
        margin: 1rem;
    }
    
    #explorer-inner {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-flow: wrap;
        height: 100%;
        overflow: auto; 
    }
    
    #sidebar {
        flex-direction: column;
        padding-top: 1rem;
    }
    
    .container {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    
    :host {
        display: block;
        background: lightblue;
        width: 100%;
        min-height: 100%;
    }
    
    div {
        display: flex;
    }
</style>
<dialog s:id="modal">
    <info-card bind:data="selectedEmployee"></info-card>
</dialog>
<div class="container">
    <h2>Shift management system</h2>
    <div class="row"> 
        <div class="input-group">
          <input id="search-input" type="text" class="form-control" placeholder="Fake search by fake query...">
          <div class="input-group-append"> 
              <button click="runSearch" class="btn btn-dark">Search</button>
          </div>
        </div>
    </div>
    <div class="row">
      <div id="sidebar" class="col-3">
        <ul class="list-group" id="registered-employees"> 
            <li class="list-group-item" s:repeat="registeredEmployees as employee">{{employee.name}} <button bind:employee-id="employee.id" click="showInfo" class="btn btn-info">Info...</button></li>
        </ul>
      </div>
      <div id="explorer" class="col-9">
      <div id="explorer-inner" s:if="employees">
        <employee-card s:repeat="employees"></employee-card>
      </div>
    </div>
</div>


`)
@useShadow(true)
class Application extends Component {

  private employees : Array<Employee>
  private selectedEmployee : Employee
  private employeeService : EmployeeService
  private registeredEmployees : Array<Employee> = []
  private modal : HTMLDialogElement

  constructor () {
    super()
    window.dispatchEvent(new Event('app-ready'))
    window['app-ready'] = true
    this.on('register-employee', (employee : Employee) => {
      employee.isRegistered = true
      if (!~this.registeredEmployees.indexOf(employee)) {
        this.registeredEmployees = this.registeredEmployees.concat(employee)
      }
    })

    this.on('unregister-employee', (employee : Employee) => {
      employee.isRegistered = false
      this.registeredEmployees = this.registeredEmployees.filter((registered) => {
        return registered !== employee
      })
    })

    this.on('option-selected', (trigger: HTMLElement) => {
      this.emit('user-action', {
        type: trigger.textContent,
        employee: this.selectedEmployee
      })
    })
  }

  static get injections () {
    return {
      employeeService: EmployeeService
    }
  }

  // noinspection JSUnusedGlobalSymbols
  protected onCreated () {
    this.employeeService.subscribe( ({detail}) => {
      this.employees = detail
    })
  }

  // noinspection JSUnusedGlobalSymbols
  showInfo ({target}) {
    const id = target.getAttribute('employee-id')
    this.selectedEmployee = this.registeredEmployees.find((employee) => {
      return employee.id = id
    })
    if (this.selectedEmployee) {
      this.modal.showModal()
    }
  }

  // noinspection JSUnusedGlobalSymbols
  unselectEmployee ({target}) {
    this.selectedEmployee = null
    this.modal.close()
  }

  runSearch () {
    // noinspection TypeScriptUnresolvedFunction
    const { value } = (<any>this).find('#search-input')
    this.employees = []
    this.employeeService.getEmployees(value)
  }

}