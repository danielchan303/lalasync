import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  showGuide = true;

  constructor() {}

  hideGuide() {
    this.showGuide = false;
  }
}
