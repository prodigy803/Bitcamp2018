import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    errSwitch = false;
    errMsg: string;
    data : Date = new Date();
    focus;
    focus1;

    constructor(private authService: AuthService, private router: Router) { }

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

    onLoginSubmit(form) {
      const user = {
        username: form.value.username.toLowerCase(),
        password: form.value.password
      };

      this.authService.authenticateUser(user).subscribe((data: any) => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigateByUrl('/');
        } else {
          this.errSwitch = true;
          this.errMsg = 'Invalid username/password';
        }
      });

    }

}
