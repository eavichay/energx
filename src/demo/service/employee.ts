import {Employee} from "../model/employee";

interface EmployeeList {
  results: EmployeeData[]
}

interface EmployeeData {
  name: {
    first: string,
    last: string
  },
  email: string,
  phone: string,
  location: {
    street: string,
    city: string,
    state: string
    email: string,
    phone: string
  },
  picture: {
    medium: string
  },
  id: {
    name: string
    value: string
  }
}

export class EmployeeService extends EventTarget {

  private _employees: Employee[]

  public get employees () : Employee[] {
    return this._employees
  }

  private setEmployees (list : Employee[]) {
    this._employees = list
    window.dispatchEvent(new CustomEvent('employees-updated', {
      detail: list
    }))
  }

  public subscribe (callback) {
    window.addEventListener('employees-updated', callback)
    return () => {
      window.removeEventListener('employees-updated', callback)
    }
  }

  async getEmployees (seed : string = 'default') {
    const rawData : EmployeeList = await fetch(`https://randomuser.me/api/?results=30&nat=US&seed=${seed}`).then(r => r.json())
    const results : EmployeeData[] = rawData.results
    const employeeList = results.map((employeeRawData : EmployeeData) => {
      const address = [
        employeeRawData.location.street,
        employeeRawData.location.city,
        employeeRawData.location.state
      ].join(', ')
      const id = [employeeRawData.id.name, employeeRawData.id.value].join('-')
      const employee : Employee = <Employee>{
        address,
        name: employeeRawData.name.last + ', ' + employeeRawData.name.first,
        pictureUrl: employeeRawData.picture.medium,
        phone: employeeRawData.phone,
        email: employeeRawData.email,
        id
      }
      return employee;
    })
    this.setEmployees(employeeList)
  }

}