import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessage,
    private router: Router
  ) { }

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
      this.flashMessage.danger("Please enter a Valid Email!", {delay: 5000});
      return false;
    }

    // Register User
    this.authService.registerUser(form.value).subscribe((data: any) => {
      if (data.success) {
        this.router.navigate(['']);
        this.flashMessage.success(data.message, {delay: 5000});
      } else {
        this.flashMessage.danger(data.message, {delay: 5000});
      }
    });

  }

}
