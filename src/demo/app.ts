import {Component} from "../index"
import {Employee} from "./model/employee"
import {EmployeeService} from "./service/employee"
import {tag, template, useShadow} from "slim-js/Decorators"

import './components/employee-card'

@tag('demo-app')
@template(`
<style>
    employee-card {
        margin: 1rem;
    }
</style>
<div s:if="!employees">Loading...</div>
<div s:if="employees">
    <h1>Shift management system</h1>
    <employee-card s:repeat="employees as data"></employee-card>
</div>
`)
@useShadow(true)
class Application extends Component {

  private employees: Employee[]
  private employeeService : EmployeeService

  static get injections () {
    return {
      employeeService: EmployeeService
    }
  }

  protected onCreated () {
    this.getEmployees ()
  }

  private async getEmployees() {
    this.employees = await this.employeeService.getEmployees()
  }
}