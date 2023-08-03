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
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  defaultOrder() { return 0; }
}
