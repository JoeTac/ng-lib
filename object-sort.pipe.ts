import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectSort'
})
export class ObjectSortPipe implements PipeTransform {
  transform(object: any, properties:any): any {
    let key = properties['key'];
    let sort = properties['sort'];
    let subSort = properties['subSort'];

    return object.sort((a,b) => {
      let aa = this.extract(a, key);
      let bb = this.extract(b, key);

      if ( aa==bb && typeof subSort === 'function' ) {
        return subSort(a, b, sort);
      }
      else {
        if ( sort.toLowerCase()=="asc" ) {
          return aa>bb ? 1:-1;
        }
        else {
          return aa>bb ? -1:1;
        }
      }
    });
  }

  private extract(obj, key:string):string {
    key.split('.').forEach( key => {
      obj = obj[key]; 
    });

    return obj;
  }
}
