import { Component, OnInit, Input } from '@angular/core';

/**
 * Sample use:
 * <app-table [headers]="headers" 
 *            [data]="data"
 *            defaultSort="offering.course.courseNameEn" 
 *            filterKey="offering.course.courseNameEn" 
 *            placeholderText="Enter course name..."></app-table>
 * 
 * placeholderText: text to be displayed in the filter input box
 * filterKey: which column will be filtered when text is entered into input box
 * defaultSort: which column is sorted. Must match a key from headers
 * data: array of an object displayed
 * headers: [
 * {
 *    // table header displayed
 *    title: "Date",
 * 
 *    // optional key for sorting. If not present sort will not work. Must also match object path from data
 *    key: "startDate",
 *    
 *    // optional column width in percent
 *    width: 30, 
 * 
 *    
 *    // optional function called for each data cell
 *    output: formatDate(obj):string {
 *      return obj.startDate;
 *    },
 * 
 *    // optional subsort function called if column is sortable when two primary
 *    // sort column are the same
 *    // a     - object 1
 *    // b     - object 2
 *    // sort  - will be either 'asc' or 'desc'
 *    sort: function(a, b, sort) {
 *      if ( sort=="asc" )
 *        return a.offering.course.courseNameEn>b.offering.course.courseNameFr ? 1:-1;
 *      return a.offering.course.courseNameEn>b.offering.course.courseNameFr ? -1:1;
 *      }
 *    }
 * ]
 * 
 * DO NOT CHANGE ANY CODE BELOW. For changes talk to Joe <giuseppe.tacconelli@oag-bvg.gc.ca>
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers = [];
  @Input() data = [];
  @Input() defaultSort;
  @Input() filterKey;
  @Input() placeholderText = "Enter search text..."

  selectedKey:string = "";
  selectedSort:string = "desc";
  selectedSubSort = null;
  filterText:string = "";


  constructor() {}

  ngOnInit(): void {
    for(let i=0; i<this.headers.length; i++) {
      if ( this.headers[i].key==this.defaultSort ) {
        this.sort(this.headers[i]);
        break;
      }
    }
  }

  sort(header):void {
    this.selectedSort = this.selectedSort=="asc" ? "desc":"asc";
    this.selectedKey = header.key;
    this.selectedSubSort = header.sort;

    this.headers.forEach(header => {
      header['asc'] = "caret-inactive";
      header['desc'] = "caret-inactive";
    });

    header[this.selectedSort] = "caret-active";
  }

  extract(obj:any, key:string):any {
    let value = obj;
    key.split(".").forEach(key => {
      value = value[key];
    });
    return value;
  }
  displayCell(obj:any, header:any):any {
    if ( this.isFunction(header.output) ) {
      return header.output(obj, header.key);
    }
    return this.extract(obj, header.key);
  }
  setWidth(header):any {
    if ( header.width ) {
      return {
        width: header.width + "%"
      };
    }
    return {};
  }
  isString(obj):boolean {
    return typeof obj === "string";
  }
  isFunction(obj):boolean {
    return typeof obj === "function";
  }
}
