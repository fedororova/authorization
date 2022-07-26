import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // перенаправить на список пользователей, если вы уже вошли в систему
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/List']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // удобный геттер для быстрого доступа к полям формы
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // остановитесь здесь, если форма недействительна
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // получить обратный URL-адрес из параметров маршрута или по умолчанию '/List'
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/List';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
