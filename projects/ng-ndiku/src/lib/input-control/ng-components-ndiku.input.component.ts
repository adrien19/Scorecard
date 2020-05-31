import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './ng-component-ndiku.errormatcher.service';
import { NgComponentsNdikuService } from './ng-components-ndiku.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'ndiku-ng-input',
  template: `
    <form [formGroup]="componentFormGroup">
      <mat-form-field>
        <mat-label *ngIf="label">{{ label }}</mat-label>
        <input
          matInput
          [type]="type"
          [id]="id"
          [placeholder]="placeholder"
          formControlName="input"
          [errorStateMatcher]="matcher"
        />

        <mat-error
          *ngIf="
            type === 'email' &&
            required &&
            componentFormGroup.controls.input.hasError('required')
          "
        >
          email field is required.
        </mat-error>
        <mat-error
          *ngIf="
            type === 'email' &&
            required &&
            !componentFormGroup.controls.input.hasError('required') &&
            !componentFormGroup.controls.input.valid
          "
        >
          Please enter valid email.
        </mat-error>
        <mat-error
          *ngIf="
            type === 'email' &&
            !required &&
            !componentFormGroup.controls.input.valid
          "
        >
          Please enter valid email.
        </mat-error>

        <mat-error
          *ngIf="
            type === 'password' &&
            required &&
            componentFormGroup.controls.input.hasError('required')
          "
        >
          password field is required.
        </mat-error>

        <mat-error
          *ngIf="
            type !== 'email' &&
            type !== 'password' &&
            required &&
            componentFormGroup.controls.input.hasError('required')
          "
        >
          Please enter valid input.
        </mat-error>
      </mat-form-field>
    </form>
  `,
  styles: [''],
})
export class NgComponentsNdikuComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();

  private _REQUIRED = false;
  private _NOTEMPTY = false;

  private _INTPUT_TYPE = 'text';
  private _INPUT_ID = '';
  private _INPUT_LABEL = '';
  private _INPUT_PLACEHOLDER = '';
  private _ON_COMPONENT_READY = new EventEmitter<FormGroup>();

  @Input()
  get required() {
    return this._REQUIRED;
  }
  set required(value: any) {
    this._REQUIRED = coerceBooleanProperty(value);
  }

  @Input()
  get notEmpty() {
    return this._NOTEMPTY;
  }
  set notEmpty(value: any) {
    this._NOTEMPTY = coerceBooleanProperty(value);
  }

  @Input()
  get type() {
    return this._INTPUT_TYPE;
  }
  set type(value: string) {
    this._INTPUT_TYPE = value;
  }

  @Input()
  get id() {
    return this._INPUT_ID;
  }
  set id(value: string) {
    this._INPUT_ID = value;
  }

  @Input()
  get label() {
    return this._INPUT_LABEL;
  }
  set label(value: string) {
    this._INPUT_LABEL = value;
  }

  @Input()
  get placeholder() {
    return this._INPUT_PLACEHOLDER;
  }
  set placeholder(value: string) {
    this._INPUT_PLACEHOLDER = value;
  }

  @Output()
  get onComponentReady() {
    return this._ON_COMPONENT_READY;
  }
  set onComponentReady(value: EventEmitter<FormGroup>) {
    this._ON_COMPONENT_READY = value;
  }

  inputSub: Subscription;

  componentFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngComponentsNdikuService: NgComponentsNdikuService
  ) {}

  ngOnInit(): void {
    // construct validators based on component input properties
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.type === 'email') {
      validators.push(Validators.email);
    }
    if (this.type === 'password') {
      validators.push(Validators.minLength(6));
    }
    this.componentFormGroup = this.fb.group({
      input: ['', validators],
    });
    this.inputSub = this.componentFormGroup.controls.input.valueChanges.subscribe(
      (value) => {
        this.ngComponentsNdikuService.inputValueChanged$.next(value);
      }
    );
    this.onComponentReady.emit(this.componentFormGroup);
  }

  ngOnDestroy(): void {
    if (this.ngComponentsNdikuService.inputValueChanged$) {
      this.ngComponentsNdikuService.inputValueChanged$.unsubscribe();
    }
    if (this.inputSub) {
      this.inputSub.unsubscribe();
    }
  }
}
