import { Pipe, PipeTransform } from '@angular/core';

/**
 * Usage: filterObject: {'property'|'subObject.property': 'search text'}
 */

@Pipe({
  name: 'filterObject'
})
export class FilterObjectPipe implements PipeTransform {

  transform(items: any, filter: any): any {
    if ( !filter || !Array.isArray(items) ) {
      return items;
    }

    let filterKeys = Object.keys(filter);
    let key = filterKeys[0];
    let pattern = filter[key];
    if ( !pattern || filter=="" )
      return items;

    pattern = pattern.replace("(", "\\(").replace(")", "\\)");
    return items.filter( (itm) => {
        let item = this.extract(itm, key);
        return new RegExp(pattern, 'gi').test(item);
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
