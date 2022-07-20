import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/start-page/start-page.component';
import { AboutmePageComponent } from './components/aboutme-page/aboutme-page/aboutme-page.component';
import { YakutskSiteComponent } from './components/yakutsk-page/yakutsk-page.component';
import { ListUserComponent } from './components/list-user/list-user/list-user.component';
import { AddListUserComponent } from './components/add-list-user/add-list-user/add-list-user.component';
import { EditListUserComponent } from './components/edit-list-user/edit-list-user/edit-list-user.component';
import { YakutskPageComponent } from './components/yakutsk-edit-page/yakutsk-page.component';

export const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'City', component: YakutskSiteComponent },
  { path: 'Me', component: AboutmePageComponent },
  { path: 'Edit', component: YakutskPageComponent },
  { path: 'List', component: ListUserComponent, canActivate: [AuthGuard] },
  {
    path: 'List/AddList',
    component: AddListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'EditList/:id',
    component: EditListUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },

  // в противном случае перенаправлять на главную
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
