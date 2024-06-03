import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangePageComponent } from './exchange-page/exchange-page.component';
import { ConvertPageComponent } from './convert-page/convert-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'exchange', component: ExchangePageComponent , canActivate:[AuthGuard]},
  { path: 'convert', component: ConvertPageComponent , canActivate:[AuthGuard]},
  { path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


