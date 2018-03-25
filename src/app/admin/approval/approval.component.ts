import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  rfps: Object[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getRfp().subscribe((rfps: any) => {
      console.log(rfps);

      this.rfps = rfps.message;
      console.log(this.rfps);
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
