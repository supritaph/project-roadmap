// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {
  baseUrl: string = 'http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/chips';
  queryUrl: string = '?search=';
  
  
    constructor(private http:Http){}
  
    search(terms: Observable<string>) {
      return terms.debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.searchEntries(term));
    }
  
    searchEntries(term) {
      return this.http
          .get(this.baseUrl + this.queryUrl + term)
          .map(res => res.json());
    }
  }
