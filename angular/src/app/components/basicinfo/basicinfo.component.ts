import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  basic_form: FormGroup;

  constructor(
    private http: Http,
    public dialog: MatDialog,
  ) {
    this.basic_form = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      days: new FormControl(null, [Validators.required])
    });
  }

  reset() {
    this.basic_form.reset();
  }

  ngOnInit() {
  }

}
