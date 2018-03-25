import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons }from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    closeResult: string;
    base_price [] : Number;
    bid_amount  = Number;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content, type) {
        if (type === 'sm') {
            console.log('aici');
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    incrementBid(){

      this.bid_amount=Math.round(this.bid_amount+this.bid_amount*0.1);
    }
    decrementBid(){

      this.bid_amount=Math.round(this.bid_amount-this.bid_amount*0.1);
    }

}
