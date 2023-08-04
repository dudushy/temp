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

  screenMode: any = 'step1';
  exampleArray: any[];
  selectedArrayItem: any = null;
  selectedGalleryItem: any = null;

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
      { os: 1, alias: 'one', op: 'one', img: 'assets/IMGs/gear1.jpg', pdf: null, budget: 1337, isRunning: 0 },
      { os: 2, alias: 'tchu', op: 'tchu', img: 'assets/IMGs/gear2.png', pdf: 'assets/PDFs/dummy.pdf', budget: 69, isRunning: 0 },
      { os: 3, alias: 'treix', op: 'treix', img: 'assets/IMGs/gear3.jpg', pdf: 'assets/PDFs/sample.pdf', budget: 1, isRunning: 0 },
      { os: 4, alias: 'quadraddo', op: 'quadraddo', img: 'assets/IMGs/gear4.jpg', pdf: 'assets/PDFs/sample.pdf', budget: 0, isRunning: 1 },
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
      op: searchBarInput.value,
      img: 'https://png.pngtree.com/element_our/20190531/ourmid/pngtree-gear-tool-image_1276937.jpg',
      pdf: 'assets/PDFs/sample.pdf',
      budget: 2,
      isRunning: 0,
    });

    console.log(`[${this.title}#addRecord] exampleArray`, this.exampleArray);

    this.updateView(this.title);
  }

  removeRecord() {
    console.log(`[${this.title}#removeRecord] selectedArrayItem`, this.selectedArrayItem);

    if (this.selectedArrayItem === null) return;

    delete this.exampleArray[this.selectedArrayItem];

    this.exampleArray = this.exampleArray.filter((item: any) => { if (item) return item; });

    console.log(`[${this.title}#removeRecord] exampleArray`, this.exampleArray);

    this.selectedArrayItem = null;

    this.updateView(this.title);
  }

  toggleSelectedItem(itemIndex: any) {
    console.log(`[${this.title}#toggleSelectedItem] itemIndex`, itemIndex);

    if (this.selectedArrayItem === itemIndex) {
      this.selectedArrayItem = null;
    } else {
      this.selectedArrayItem = itemIndex;
    }

    this.updateView(this.title);
  }

  toggleSelectedGalleryItem(itemIndex: any) {
    console.log(`[${this.title}#toggleSelectedGalleryItem] itemIndex`, itemIndex);

    if (this.exampleArray[itemIndex].isRunning) return;

    if (this.selectedGalleryItem === itemIndex) {
      this.selectedGalleryItem = null;
    } else {
      this.selectedGalleryItem = itemIndex;
    }

    this.fillFields(this.exampleArray[this.selectedGalleryItem]);

    this.updateView(this.title);
  }

  setScreenMode(mode: any) {
    console.log(`[${this.title}#setScreenMode] mode`, mode);

    this.screenMode = mode;
    console.log(`[${this.title}#setScreenMode] screenMode`, this.screenMode);

    this.updateView(this.title);
  }

  openPdf(url) {
    console.log(`[${this.title}#openPdf] url`, url);

    if (url === null) { alert('PDF not found!'); return; }

    // window.open('assets/PDFs/sample.pdf', '_blank');
    window.open(url, '_blank');

    // const link = document.createElement('a');
    // link.download = 'filename.pdf';
    // link.target = 'blank';
    // link.href = 'assets/pdfs/sample.pdf';
    // link.href = url;
    // link.click();
  }

  run(nametag: any) {
    console.log(`[${this.title}#run] (BEFORE) nametag`, nametag);

    if (!nametag) return;

    const amountInput = document.getElementById('amount-input') as HTMLInputElement;
    console.log(`[${this.title}#fillFields] amountInput`, amountInput);

    if (!amountInput) return;

    nametag['amount'] = parseInt(amountInput.value);

    console.log(`[${this.title}#run] (AFTER) nametag`, nametag);
  }

  fillFields(item: any) {
    console.log(`[${this.title}#fillFields] item`, item);

    const OSInput = document.getElementById('os-input') as HTMLInputElement;
    console.log(`[${this.title}#fillFields] OSInput`, OSInput);

    if (!OSInput) return;

    OSInput.value = item ? item.op : '';

    this.updateView(this.title);
  }
}
