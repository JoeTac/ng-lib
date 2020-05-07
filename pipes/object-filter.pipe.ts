import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(items: any, properties: any): any {
    if ( !properties || 
         !properties.key || properties.key.trim().length==0 ||
         !properties.text || properties.text.trim().length==0 ||
         !Array.isArray(items) )
    {
      return items;
    }

    let key = properties.key.trim();
    let pattern = properties.text.trim();

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
