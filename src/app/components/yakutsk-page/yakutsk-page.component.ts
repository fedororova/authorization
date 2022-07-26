import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-yakutsk-page',
  templateUrl: './yakutsk-page.component.html',
  styleUrls: ['./yakutsk-page.component.css']
})


export class YakutskSiteComponent implements OnInit {
  public user: {
    name: string;
    name2: string;
    name3: string;
  } = JSON.parse(localStorage.getItem("key")) ?? {};

  public data = {
    izm: this.user.name ?? 'Население Якутска на 1 января 2022 года составляет 330615 человек.',
    izm2: this.user.name2 ?? 'На 1 января 2021 года по численности населения город находился на 59-м месте из 1116 городов Российской Федерации.',
    izm3: this.user.name3 ?? 'Якутск — многонациональный город. Большинство составляют якуты (саха) — 141 тыс. чел. и русские — 113 тыс. чел. Также проживают эвенки, эвены и другие.'
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
