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
  }
}

export class EmployeeService {

  async getEmployees () {
    const rawData : EmployeeList = await fetch('https://randomuser.me/api/?results=30&nat=US&seed=12345').then(r => r.json())
    const results : EmployeeData[] = rawData.results
    return results.map((employeeRawData : EmployeeData) => {
      const address = [
        employeeRawData.location.street,
        employeeRawData.location.city,
        employeeRawData.location.state
      ].join(', ')
      const employee : Employee = <Employee>{
        address,
        name: employeeRawData.name.last + ', ' + employeeRawData.name.first,
        pictureUrl: employeeRawData.picture.medium,
        phone: employeeRawData.phone,
        email: employeeRawData.email
      }
      return employee;
    })
  }
}