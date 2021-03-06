import { HttpClient } from '@angular/common/http';
import { Injectable, Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { of, Subscription } from 'rxjs';


@Injectable()
export class getCountry {
  constructor(private _httpClient: HttpClient) { }
  opts = [];
  getData() {
    return this.opts.length ?
      of(this.opts) :
      this._httpClient.get<any>('https://api.covid19api.com/countries').pipe(tap(data => this.opts = data.Country))
  }
}

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'table-http-example',
  styleUrls: ['table-http-example.css'],
  templateUrl: 'table-http-example.html',
  encapsulation: ViewEncapsulation.None

})
export class TableHttpExample implements AfterViewInit {
  displayedColumns: string[] = ['Country', 'CountryCode', 'Cases', 'Status', 'Date'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  temp: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.isLoadingResults = false;
    // this.getData(); 
  }

  getData() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.coutryName.value);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.temp = data;
          this.resultsLength = this.temp.length;
          return data.items = this.temp;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  coutryName = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  optionData: Observable<any[]>;

  //(optionSelected)="onSelectionChange()

  constructor(private _httpClient: HttpClient, private getCountry: getCountry) { }

  ngOnInit() {
    // get data for select Search input
    this.filteredOptions = this.coutryName.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter(value))
    )
  }

  doFilter(value: string) {
    return this.getCountry.getData()
      .pipe(
        map(response => response.filter((option: { Country: string; }) => {
          return option.Country.toLowerCase().indexOf(value.toLowerCase()) === 0
        }))
      )
  }

  onBlurContryName() {
    this.filteredOptions = this.doFilter(this.coutryName.value)
  }

  // submit search button
  doSearch() {
    this.getData();
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

// get data by Country 
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) { }
  getRepoIssues(sort: string, order: string, page: number, _id: string): Observable<GithubApi> {
    // const href = 'https://api.covid19api.com/dayone/country/'+ _id;
    // const href = 'https://api.covid19api.com/dayone/country/south-africa'
    if (!_id) { _id = 'Viet Nam' }
    const href = 'https://api.covid19api.com/dayone/country/' + _id + '/status/confirmed'
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}




