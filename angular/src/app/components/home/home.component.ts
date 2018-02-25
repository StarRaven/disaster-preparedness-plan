import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  login_form: FormGroup;
  disaster_date: FormGroup;
  start: Date;
  end: Date;

  constructor(
    private router: Router,
    private global: GlobalService,
    private http: Http,
    public snackBar: MatSnackBar,
    private auth: AuthService,
  ) {
    this.login_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.disaster_date = new FormGroup({
      disaster: new FormControl(null, [Validators.required]),
      startdate: new FormControl(null, [Validators.required]),
      enddate: new FormControl(null, [Validators.required])
    });
  }

  Login(): void {
    let body = JSON.stringify({ username: this.login_form.get('username').value, password: this.login_form.get('password').value });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/login', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          localStorage.setItem('id', jsonDataBody.id);
          localStorage.setItem('username', jsonDataBody.username);
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    
    /*
    let sampleUser: any = {
      email: 'admin@admin.com' as string,
      username: 'admin' as string,
      password: 'admin' as string
    };
    this.auth.register(sampleUser)
    .then((user) => {
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
    this.auth.login(sampleUser).then((user) => {
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
    */
  }

  checkLogin(): boolean {
    if (!this.global.login) {
      this.snackBar.open('Please Log in first','x', {
        duration: 2000,
      });
      return false;
    }
    return true;
  }

  checkFill(): boolean {
    if ((!this.disaster_date.get('startdate').value) || (!this.disaster_date.get('enddate').value) || (!this.disaster_date.get('disaster').value)) {
      this.snackBar.open('Please fill out all the blanks','x', {
        duration: 2000,
      });
      return false;
    }
    return true;
  }

  DisasterDate() {
    if (!this.checkLogin())
      return;
    if (!this.checkFill())
      return;
    this.start = this.disaster_date.get('startdate').value;
    this.end = this.disaster_date.get('enddate').value;
    let s = + this.start;
    let e = + this.end;
    this.global.days = (e - s) / 86400000;
    this.global.location = this.disaster_date.get('disaster').value;
    this.router.navigate(['family']);
  }
}
