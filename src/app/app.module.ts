import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { YakutskPageComponent } from './yakutsk-edit-page/yakutsk-page.component';
import { MainComponent } from './start-page/main.component';
import { AboutmePageComponent } from './aboutme-page/aboutme-page.component';
import { YakutskSiteComponent } from './yakutsk-page/yakutsk-page.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddListUserComponent } from './add-list-user/add-list-user.component';
import { EditListUserComponent } from './edit-list-user/edit-list-user.component';
import { LoginComponent } from './login/login.component';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    YakutskPageComponent,
    AboutmePageComponent,
    YakutskSiteComponent,
    ListUserComponent,
    AddListUserComponent,
    EditListUserComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NzMenuModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzModalModule,
    NzPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTableModule,
    NzDescriptionsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzImageModule,
    NzGridModule,
    NzDividerModule,
    NzTypographyModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}

export class NzDemoPageHeaderBasicComponent {
  onBack(): void {
    console.log('onBack');
  }
}

export class NzDemoPageHeaderGhostComponent {}
export class NzDemoLayoutTopComponent {}
export class NzDemoGridBasicComponent {}
export class NzDemoPaginationBasicComponent {}
