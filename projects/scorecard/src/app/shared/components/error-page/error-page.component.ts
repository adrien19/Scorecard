
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-page',
  template: `
    <h2> {{ (errorMessage$ | async )['errorMessage'] }} </h2>
  `,
  styles: [``]
})

export class ErrorPageComponent implements OnInit {

  errorMessage$: Observable<Data>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.errorMessage$ = this.route.data;
  }
}
