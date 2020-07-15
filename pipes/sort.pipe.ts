import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(object: any, properties:any): any {
    let key = properties;
    let sort = 'asc';

    if ( properties ) {
      if ( properties['key'] ) key = properties['key'];
      if ( properties['sort'] ) sort = properties['sort'];
    }
    
    return object.sort((a,b) => {
      let aa = this.extract(a, key);
      let bb = this.extract(b, key);

      if ( sort.toLowerCase()=="asc" ) {
        return aa>bb ? 1:-1;
      }
      else {
        return aa>bb ? -1:1;
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
