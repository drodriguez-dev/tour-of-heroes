import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const heroes: Hero[] = [
      { id: 1, name: 'The Homelander' },
      { id: 2, name: 'Black Noir' },
      { id: 3, name: 'Queen Maeve' },
      { id: 4, name: 'A-Train' },
      { id: 5, name: 'The Deep' },
      { id: 6, name: 'Jack from Jupiter' },
      { id: 7, name: 'Starlight' },
      { id: 8, name: 'Mister Marathon' },
      { id: 9, name: 'Translucent' }
    ];

    return { heroes }; // TODO: Remove the brakets, what happens?
  }

  /** Overrides the genId method to ensure that a hero always has an id. If the heroes
   * array is empty, the method below returns the initial number (11). if the heroes
   * array is not empty, the method below returns the highest hero id + 1.
   */
  genId(heroes: Hero[]): number {
    // TODO: Remove the ellipsis, what happens?
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
