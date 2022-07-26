import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-yakutsk-page',
  styleUrls: ['./yakutsk-page.component.css'],
  templateUrl: './yakutsk-page.component.html',
})
export class YakutskPageComponent implements OnInit {
  myFirstReactiveForm: UntypedFormGroup;

  public user: {
    name: string;
    name2: string;
    name3: string;
  } = JSON.parse(localStorage.getItem('key')) ?? {};

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**Инициализация формы*/
  private initForm() {
    this.myFirstReactiveForm = this.fb.group({
      name: [
        this.user.name ??
          'Население Якутска на 1 января 2022 года составляет 330615 человек.',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      name2: [
        this.user.name2 ??
          'На 1 января 2021 года по численности населения город находился на 59-м месте из 1116 городов Российской Федерации.',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
      name3: [
        this.user.name3 ??
          'Якутск — многонациональный город. Большинство составляют якуты (саха) — 141 тыс. чел. и русские — 113 тыс. чел. Также проживают эвенки, эвены и другие.',
        [Validators.required, Validators.pattern(/[А-я]/)],
      ],
    });
  }

  /**Отправка формы*/
  onSubmit() {
    const controls = this.myFirstReactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.myFirstReactiveForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      /** Прерываем выполнение метода*/
      return;
    }
    /**Обработка данных формы и запись в localstorage*/
    console.log(this.myFirstReactiveForm.value);
    const str = JSON.stringify(this.myFirstReactiveForm.value);
    localStorage.setItem('key', str);
  }

  isControlInvalid(controlName: string): boolean {
    const control =
      this.myFirstReactiveForm.controls[controlName]; /**Доступ к контролу */
    /**Проверяем валидность контрола и возвращает true/false*/
    const result = control.invalid && control.touched;

    return result;
  }
}
