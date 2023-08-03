/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  allPages: any = [];

  window = window;

  exampleArray: any [];
  selectedArrayItem: any = null;

  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.title}#constructor]`);

    const rawAllPages = this.router.config;
    console.log(`[${this.title}#constructor] rawAllPages`, rawAllPages);

    this.allPages = rawAllPages.filter((page: any) => {
      return page.path !== '' && page.path !== '**';
    });

    console.log(`[${this.title}#constructor] allPages`, this.allPages);

    this.window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);
    };

    this.window.onload = () => {
      console.log(`[${this.title}#window.onload]`);
    };

    this.exampleArray = [
      { os: 1, alias: 'one', date: 'one', oi: 'one', xau: 'one' },
      { os: 2, alias: 'tchu', date: 'tchu', oi: 'tchu', xau: 'tchu' },
      { os: 3, alias: 'three', date: 'three', oi: 'three', xau: 'three' },
      { os: 4, alias: 'four', date: 'four', oi: 'four', xau: 'four' },
    ];
    console.log(`[${this.title}#constructor] exampleArray`, this.exampleArray);
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  defaultOrder() { return 0; }

  addRecord() {
    console.log(`[${this.title}#addRecord]`);

    const searchBarInput = document.getElementById('searchBar-input') as HTMLInputElement;
    console.log(`[${this.title}#addRecord] searchBarInput`, searchBarInput);

    if (!searchBarInput) return;

    console.log(`[${this.title}#addRecord] searchBarInput.value`, searchBarInput.value);
  }

  removeRecord() {
    console.log(`[${this.title}#removeRecord]`);
  }
}
