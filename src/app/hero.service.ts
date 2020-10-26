import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private emptyHeroes(): Hero[] {
    return [];
  }

  /**
   * Handle Http operation that failed. Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    const start = new Date().getTime();

    const heroes = this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap((hs: Hero[]) => {
          const elapsed = new Date().getTime() - start;
          this.log(`fetched heroes in ${elapsed} ms.: ${hs.map(h => h.name)}`);
        }),
        catchError(this.handleError<Hero[]>('getHeroes', this.emptyHeroes()))
      );

    return heroes;
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const start = new Date().getTime();

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap((h: Hero) => {
          const elapsed = new Date().getTime() - start;
          this.log(`fetched hero in ${elapsed} ms.: ${h.name}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const start = new Date().getTime();

    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(() => {
          const elapsed = new Date().getTime() - start;
          this.log(`updated hero in ${elapsed} ms.: ${hero.name}`);
        }),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    const start = new Date().getTime();

    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => {
          const elapsed = new Date().getTime() - start;
          this.log(`added hero in ${elapsed} ms.: ${newHero.name}`);
        }),
        catchError(this.handleError<Hero>('addHero'))
      );
  }
}
