import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  applications: Object[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.readRfp().subscribe((rfps: any) => {
      this.applications = rfps.msg;
      console.log(this.applications);
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
