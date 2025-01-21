import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CustomValidators } from '../../shared/custom-validator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



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
    NgbPopoverModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule
  ], // Import der benötigten Module
  providers: [
    MatDatepickerModule  ], // Provider für das Datum
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent {
    public registrationForm: FormGroup;
      matcher = new MyErrorStateMatcher();

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {
    this.registrationForm = this.formbuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          CustomValidators.patternValidator(/^([^0-9]*)$/, { hasLetters: true })
        ])],
        agreeNewsletter: false,
        email: ['', Validators.compose([
          Validators.minLength(4),
          Validators.email
        ])],
        birthdate: ['', Validators.required],
        courseId: ['', Validators.required],
        submitDatetime: new Date(),
      });
  }

  onSubmit() {
    // format the date column
    this.registrationForm.value.birthdate = new Date(
      this.registrationForm.value.birthdate
    ).toISOString();

    // set the current submit date
    this.registrationForm.value.submitDatetime = new Date().toISOString();

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
