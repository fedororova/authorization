import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../app/models/interfaces/user.interface';

const users: User[] = JSON.parse(localStorage.getItem('users') as string);

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // завернуть в отложенное наблюдаемое для имитации вызова API сервера
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // пройти через любые запросы, не обработанные выше
          return next.handle(request);
      }
    }

    // функции роута

    function authenticate() {
      const { login, password } = body;
      const user = users.find(
        (x) => x.login === login && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        login: user.login,
        name: user.name,
        token: 'fake-jwt-token',
      });
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    // вспомогательные функции

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // использовать поддельный бэкэнд вместо службы Http для разработки без бэкэнда
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
