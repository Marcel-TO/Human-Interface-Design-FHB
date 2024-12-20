import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CustomValidators } from '../../shared/custom-validator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-data',
  standalone: true, // standalone-Komponente
  imports: [
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ], // Import der benötigten Module
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ], // Provider für das Datum
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent implements OnInit {
    nameFormControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        CustomValidators.patternValidator(/^([^0-9]*)$/, { hasLetters: true}) // Regex expression for everything except numbers
      ]));
      matcher = new MyErrorStateMatcher();
      emailFormControl = new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]));
      birthdateFormControl = new FormControl<Date | null>(null, Validators.compose([
        Validators.required,
      ]));
      courseIdFormControl = new FormControl('', Validators.compose([
        Validators.required,
      ]));

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}
  public registrationForm: any;

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.backendService.addRegistration(
        this.registrationForm.value,
        this.storeService.currentPage
      );
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
