import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortObject'
})
export class SortObjectPipe implements PipeTransform {

  transform(object: any, property:string): any {
    return object.sort((a,b) => {
      if ( a[property]<b[property] ) {
        return -1;
      }
      else if ( a[property]>b[property] ) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
