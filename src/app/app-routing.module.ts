import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './start-page/main.component';
import { AboutmePageComponent } from './aboutme-page/aboutme-page.component';
import { YakutskSiteComponent } from './yakutsk-page/yakutsk-page.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddListUserComponent } from './add-list-user/add-list-user.component';
import { EditListUserComponent } from './edit-list-user/edit-list-user.component';
import { YakutskPageComponent } from './yakutsk-edit-page/yakutsk-page.component';


export const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'City', component: YakutskSiteComponent },
  { path: 'Me', component: AboutmePageComponent },
  { path: 'Edit', component: YakutskPageComponent },
  { path: 'List', component: ListUserComponent, canActivate: [AuthGuard] },
  { path: 'List/AddList', component: AddListUserComponent, canActivate: [AuthGuard] },
  { path: 'EditList/:id', component: EditListUserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
