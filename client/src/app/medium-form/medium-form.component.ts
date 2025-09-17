import {
  Component,
  effect,
  EventEmitter,
  input,
  Output,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Medium } from '../medium';

@Component({
  selector: 'app-medium-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .medium-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="medium-form"
      autocomplete="off"
      [formGroup]="mediumForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Bitte mindestens 3 Zeichen! 😡</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Inhalt</mat-label>
        <input
          matInput
          placeholder="Inhalt"
          formControlName="inhalt"
          required
        />
        @if (inhalt.invalid) {
        <mat-error>Bitte mindestens 5 Zeichen! 😡</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="format" aria-label="Bitte wähle ein Format aus! 😁">
        <mat-radio-button name="format" value="film" required
          >Film</mat-radio-button
        >
        <mat-radio-button name="format" value="serie"
          >Serie</mat-radio-button
        >
        <mat-radio-button name="format" value="buch"
          >Buch</mat-radio-button
        >
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="mediumForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class MediumFormComponent implements OnInit {
  initialState = input<Medium>();

  @Output()
  formValuesChanged = new EventEmitter<Medium>();

  @Output()
  formSubmitted = new EventEmitter<Medium>();

  mediumForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.mediumForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      inhalt: ['', [Validators.required, Validators.minLength(5)]],
      format: ['', [Validators.required]],
    });

    effect(() => {
      this.mediumForm.setValue({
        name: this.initialState()?.name || '',
        inhalt: this.initialState()?.inhalt || '',
        format: this.initialState()?.format || 'film',
      });
    });
  }

  get name() {
    return this.mediumForm.get('name')!;
  }
  get inhalt() {
    return this.mediumForm.get('inhalt')!;
  }
  get format() {
    return this.mediumForm.get('format')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.mediumForm.value as Medium);
  }
}
