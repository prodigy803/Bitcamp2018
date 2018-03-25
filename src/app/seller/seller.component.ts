import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {NgForm} from '@angular/forms';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  selectedFile = null;
  selectedFileUrl = "assets/img/image_placeholder.jpg";
  user: any;
  uploadProgress = 0;
  progressType = "";
  rfp = {userId: "", proType: "", proSubType: "", proName: "", quantity: "", amount: "", fileInput: ""};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private flashMessage: FlashMessage
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onFileChanged(event) {
    var reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.onload = (event: any) => {
      this.selectedFileUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile);

    console.log(this.selectedFile);
    console.log(this.selectedFileUrl);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('pro_image', this.selectedFile);
    fd.append('user_id', this.user.id);
    this.http.post('http://localhost:3000/users/upload', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event: any) => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(event.loaded / event.total * 100);
        if (this.uploadProgress <= 30) {
          this.progressType = "warning";
        }
        else if (this.uploadProgress > 30 && this.uploadProgress <= 70) {
          this.progressType = "info";
        }
        else {
          this.progressType = "success";
        }
      }
      else if (event.type === HttpEventType.Response) {
        if (event.body.msg) {
          this.user.proimage = event.body.proImage;
          localStorage.setItem('user', JSON.stringify(this.user));
          // this.flashMessage.success("File Uploaded Successfully.", { delay: 5000 });
        } else {
          // this.flashMessage.danger("Something went wrong.", { delay: 5000 });
        }
      }
      else if (event.type === HttpEventType.ResponseHeader) {
        // this.flashMessage.danger(event.statusText, { delay: 5000 });
      }
    });
  }

  onRfpSubmit(form: NgForm) {
    console.log(form.value);
    var formData = JSON.stringify(form.value);
    console.log(formData);
    this.rfp.userId = this.user.id;

    // Register User
    this.authService.rfpSubmit(this.rfp).subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.success(data.message, {delay: 5000});
      } else {
        this.flashMessage.success(data.message, {delay: 5000});
      }
    });

  }


}
