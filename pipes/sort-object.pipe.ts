import { Pipe, PipeTransform } from '@angular/core';

/**
 * Usage: sortObject: { key: 'property'|'subObject.property', asc: true|false }
 */

@Pipe({
  name: 'sortObject'
})
export class SortObjectPipe implements PipeTransform {
  transform(object: any, properties:string): any {
    let key = properties['key'];
    let asc = properties['asc'];

    if ( !key ) return object;
    if ( !asc ) asc = true;

    return object.sort((a,b) => {
      let aa = this.extract(a, key);
      let bb = this.extract(b, key);

      if ( asc ) {
        return aa>bb ? 1:-1;
      }
      else {
        return aa>bb ? -1:1;
      }
    });
  }

  private extract(obj, key:string):string {
    let keys = key.split('.');

    keys.forEach( key => {
      obj = obj[key]; 
    });

    return obj;
  }
}
