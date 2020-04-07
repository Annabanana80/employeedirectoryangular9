import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id).subscribe(
      (data) => {
        console.log(data);
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.employee = new Employee();
    this.gotoDetail(this.id);
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoDetail(id: number) {
    this.router.navigate(['employees', 'details', id]);
  }
}
