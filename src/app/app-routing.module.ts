import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DepartementComponent} from "./components/departement/departement.component";
import {SiteComponent} from "./components/site/site.component";
import {ReservationComponent} from "./components/reservation/reservation.component";
import {SiteParDepartementComponent} from "./components/site-par-departement/site-par-departement.component";
import {MediatechComponent} from "./components/mediatech/mediatech.component";
import {LoginComponent} from "./components/login/login.component";
import {SecureInnerPagesGuard} from "./services/secure-inner-pages.guard";
import {AuthGuard} from "./services/auth.guard";
import {RegisterComponent} from "./components/register/register.component";
import {MediatechListComponent} from "./components/mediatech-list/mediatech-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent,canActivate: [SecureInnerPagesGuard]},
  {path:'register',component:RegisterComponent},
  {
    path: 'dashboard', component: HomeComponent,canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'departments', pathMatch: 'full'},
      {path: 'departments', component: DepartementComponent},
      {path: 'departments/:id', component: SiteParDepartementComponent},
      {path: 'sites', component: SiteComponent},
      {path: 'sites/:id', component: ReservationComponent},
      {path: 'mediatech', component: MediatechListComponent},
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
