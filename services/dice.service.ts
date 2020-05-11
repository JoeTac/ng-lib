import { Injectable } from '@angular/core';
import { RandomService } from './random.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  constructor(private random:RandomService) { }

  public d4:string = "d4";
  public d6:string = "d6";
  public d8:string = "d8";
  public d12:string = "d12";
  public d20:string = "d20";
  public d100:string = "d100";

  public roll(diceSyntax:string):Observable<number> {
    return new Observable<number>((observer:Observer<number>) => {
      let result = this.parse(diceSyntax);
      this.random.integers(1, result.dieType, result.dieCount).subscribe(data => {
        observer.next(data[0] + result.modifier);
      });
    });
  }

  private parse(diceSyntax:string) {
    let results = new RegExp(/([1-9][0-9]*)?[dD]([1-9][0-9]{0,2})([-+][1-9][0-9]+)?/g).exec(diceSyntax);
    return {
      dieCount: results[1] ? parseInt(results[1]):1,
      dieType: results[2] ? parseInt(results[2]):1,
      modifier: results[3] ? parseInt(results[3]):0
    };
  }
}
