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

    if (!searchBarInput.value || searchBarInput.value == '') return;

    console.log(`[${this.title}#addRecord] searchBarInput.value`, searchBarInput.value);

    this.exampleArray.push({
      os: this.exampleArray.length + 1,
      alias: searchBarInput.value,
      date: searchBarInput.value,
      oi: searchBarInput.value,
      xau: searchBarInput.value
    });

    this.updateView(this.title);
  }

  removeRecord() {
    console.log(`[${this.title}#removeRecord] selectedArrayItem`, this.selectedArrayItem);

    if (this.selectedArrayItem === null) return;

    delete this.exampleArray[this.selectedArrayItem];
    this.updateView(this.title);
  }

  toggleSelectedItem(itemIndex: any) {
    console.log(`[${this.title}#toggleSelectedItem] itemIndex`, itemIndex);

    if (this.selectedArrayItem === itemIndex) {
      this.selectedArrayItem = null;
    } else {
      this.selectedArrayItem = itemIndex;
    }
  }
}
