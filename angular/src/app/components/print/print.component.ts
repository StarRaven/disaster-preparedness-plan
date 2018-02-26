import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Memo } from '../../memo';
import { MemoService } from '../../services/memo.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  show: boolean[] = [];

  displayedColumnsMemo = ['title', 'content'];
  dataSourceMemo = new MatTableDataSource<Memo>();
  memos: Memo[] = [];

  constructor(
    private memoS: MemoService,
  ) { }


  getAllMemos() {
    const lsid = localStorage.getItem('id');
    this.memoS.get(lsid).subscribe(
      (jsonData) => {
        this.memos = [];
        const jsonDataBody = jsonData.json();
        for (const entry of jsonDataBody) {
          const r: Memo = {
            id: entry[0],
            title: entry[2],
            content: entry[3],
          };
          this.memos.push(r);
        }
        this.dataSourceMemo = new MatTableDataSource<Memo>(this.memos);
        console.log(this.memos);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log('observable complete')
    );
  }

  ngOnInit() {
    for (let i = 0; i < 12; i++) {
      this.show.push(true);
    }

    this.getAllMemos();
  }

  toggle(id: number) {
    this.show[id] = !this.show[id];
  }
}
