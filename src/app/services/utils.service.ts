import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  isNum(value: unknown, remove: number) {
    return Number.isInteger(value) ? value as number : remove;
  }
}
