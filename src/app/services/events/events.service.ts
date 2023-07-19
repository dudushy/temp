/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  title = '@events';

  channels: { [key: string]: Subject<any>; } = { };

  constructor() {
    console.log(`[${this.title}}#constructor]`);
  }

  subscribe(topic: string, observer: (_: any) => void): Subscription {
    if (!this.channels[topic]) this.channels[topic] = new Subject<any>();

    return this.channels[topic].subscribe(observer);
  }

  publish(topic: string, data?: any): void {
    const subject = this.channels[topic];
    if (!subject) return;

    subject.next(data);
  }

  destroy(topic: string) {
    const subject = this.channels[topic];
    if (!subject) return;

    subject.complete();
    delete this.channels[topic];
  }
}
