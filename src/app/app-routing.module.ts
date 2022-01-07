import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AddDepartementComponent} from "./components/forms/add-departement/add-departement.component";
import {AddSiteComponent} from "./components/forms/add-site/add-site.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DepartementComponent} from "./components/departement/departement.component";
import {SiteComponent} from "./components/site/site.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: HomeComponent,
    children: [
      {path: 'departements', component: DepartementComponent},
      {path: 'sites', component: SiteComponent},
      {path: 'add-site', component: AddSiteComponent},
      {path: 'add-departement', component: AddDepartementComponent},
    ]
  },
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
