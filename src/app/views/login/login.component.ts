import { Component } from '@angular/core';
import { ReqresService } from '../../reqres.service';
import { CustomerService } from '../../customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.scss']
})
export class LoginComponent {

  email: string = 'peter@klaven';
  password: string = 'cityslicka';

  constructor(private reqres: ReqresService, private customerService: CustomerService, private router: Router) {
  }

  tryLogin() {
    this.reqres.login(
      this.email,
      this.password
    )
      .subscribe(
        this.loginSuccess.bind(this),
        response => {
          alert(response.error.error);
        });
  }

  loginSuccess(response) {
    if (response.token) {
      this.customerService.setToken(response.token);
      this.router.navigateByUrl('/dashboard');
    }
  }

}