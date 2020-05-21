import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  url:string = "https://www.random.org";

  constructor(private http:HttpClient) { }

  integers(min:number, max:number, count:number):Observable<number[]> {
    if ( count<1 ) count = 1;
    let url = this.url + "/integers/?num=" + count + "&min=" + min + "&max=" + max + "&col=1&base=10&format=plain&rnd=new";
    return new Observable<number[]>((observer:Observer<number[]>) => {
      this.http.get(url, {responseType: 'text'}).subscribe(data => {
          let results:number[] = [];
          data.split('\n').forEach(e => {
            let n = parseInt(e);
            if ( !isNaN(n) ) {
              results.push(n);
            }
          });
          observer.next(results);
          observer.complete();
      });
    });
  }

  integer(min:number, max:number):Observable<number> {
    return new Observable<number>((observer:Observer<number>) => {
      this.integers(min, max, 1).subscribe(data => {
        observer.next(data[0]);
        observer.complete();
      });
    });
  }
}
