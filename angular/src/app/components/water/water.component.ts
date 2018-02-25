import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Human } from '../../human';
import { Pet } from '../../pet';

import * as Chart from 'chart.js';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {
  @ViewChild('donut') donut: ElementRef;
  humans: Human[] = [];
  pets: Pet[] = [];
  petwater: number = 0;
  drinkwater: number = 0;
  foodwater: number = 0;

  constructor(
    public global: GlobalService,
    private http: Http,
  ) { }

  updatechart(): void {
    let donutCtx = this.donut.nativeElement.getContext('2d');
    var data = {
      labels: [
        "For Drinking",
        "For Food Preparation, Sanitation and Other Activities",
        "For Pets"
      ],
      datasets: [
        {
          "data": [this.drinkwater, this.foodwater, this.petwater],   // Example data
          "backgroundColor": [
            "#a9a9a9",
            "#9294de",
            "#92d5dd"
          ]
        }]
    };

    var chart = new Chart(
      donutCtx,
      {
        "type": 'doughnut',
        "data": data,
        "options": {
          "legend": {
            "display": false,
            "position": 'bottom'
          },
          "scaleShowLabels": false,
          "responsive": false,
          "maintainAspectRatio": false,
          "cutoutPercentage": 0,
          "animation": {
            "animateScale": true,
            "animateRotate": false
          }
        }
      }
    );
  }

  getpets(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.get('/api/get/pet', { headers: headers }).subscribe(
      (jsonData) => {
        this.pets = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Pet = {
            id: entry[0],
            petname: entry[2],
            pettype: entry[3],
            weight: entry[4],
          };
          this.pets.push(r);
          this.petwater = this.petwater + r.weight * 0.04;
        };
        this.petwater = this.petwater * this.global.days;
        console.log(this.pets);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => this.updatechart()
    );
  }
  getAllMembers(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/human', { headers: headers }).subscribe(
      (jsonData) => {
        this.humans = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Human = {
            id: entry[0],
            firstname: entry[2],
            lastname: entry[3],
            gender: entry[4],
            birthdate: entry[5],
            phone: entry[6],
            health: entry[7],
          };
          this.humans.push(r);
          this.drinkwater = this.drinkwater + 0.5;
          this.foodwater = this.foodwater + 1;
        };
        this.drinkwater = this.drinkwater * this.global.days;
        this.foodwater = this.foodwater * this.global.days;
        console.log(this.humans);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => this.getpets()
    );



  }

  ngOnInit() {
    this.getAllMembers();

  }

}
