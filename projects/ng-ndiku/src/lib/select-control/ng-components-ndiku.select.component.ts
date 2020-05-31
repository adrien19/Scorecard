import { Component, Input } from '@angular/core';

@Component({
  selector: 'ndiku-ng-select',
  template: `<h2>Welcome to {{ name }} demo!</h2>`,
})
export class NgComponentsNdikuSelectComponent {
  @Input() name: string;
}
