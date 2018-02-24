import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private BASE_URL = 'http://localhost:5000/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}
  login(user): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
/*
  login(user): boolean {
    let body = JSON.stringify({ username: user.username, password: user.password, role: "role" });
    let headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('/api/login', body, {headers: headers}).subscribe(data => {
      console.log(data);
    });
    return true;

  }*/
}
