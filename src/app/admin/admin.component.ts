import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource = {
  "chart": {
      "caption": "Ninja Cart",
      "subCaption": "Top RFP's",
      "xaxisname": "Products",
      "yaxisname": "Amount (In Rs)",
      "numberPrefix": "",
      "theme": "fint"
  },
  "data": [
      {
          "label": "Grean Peas",
          "value": "1000"
      },
      {
          "label": "Spring onion",
          "value": "1500"
      },
      {
          "label": "Potato",
          "value": "2500"
      },
      {
          "label": "Apple",
          "value": "2000"
      },
      {
          "label": "Banana",
          "value": "3500"
      },
      {
          "label": "Cauliflower",
          "value": "4000"
      }

  ]
};

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  openapproval(){
    this.router.navigate(['approval']);
  }
  opendelivery(){
    this.router.navigate(['delivery']);
  }
}
