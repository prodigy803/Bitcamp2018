import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errSwitch = false;
  succSwitch = false;
  submitSwitch = false;
  errMsg: string;
  succMsg: string;

  constructor(private validateService: ValidateService, private authService: AuthService) { }

  ngOnInit() {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');

      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');

      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
  }

  onRegisterSubmit(form) {

    // Validate Email
    if (!this.validateService.validateEmail(form.value.email)) {
      this.errSwitch = true;
      this.errMsg = 'Please use a valid email';
      return false;
    }

    // Register User
    this.authService.registerUser(form.value).subscribe((data: any) => {
      if (data.success) {
        this.succSwitch = true;
        this.succMsg = 'You are now registered and can log in';
        this.errSwitch = false;
        this.errMsg = '';
        this.submitSwitch = true;
      } else {
        this.succSwitch = false;
        this.succMsg = '';
        this.errSwitch = true;
        this.errMsg = 'Something went wrong';
      }
    });

  }

}
