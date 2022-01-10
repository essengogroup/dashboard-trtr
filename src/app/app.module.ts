import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddDepartementComponent} from './components/forms/add-departement/add-departement.component';
import {AddSiteComponent} from './components/forms/add-site/add-site.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DepartementComponent} from './components/departement/departement.component';
import {SiteComponent} from './components/site/site.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {EditDepartmentComponent} from './components/forms/edit-department/edit-department.component';
import { MatDialogModule} from "@angular/material/dialog";
import { ReservationComponent } from './components/reservation/reservation.component';
import { EditSiteComponent } from './components/forms/edit-site/edit-site.component';
import { SiteParDepartementComponent } from './components/site-par-departement/site-par-departement.component';
import { MediatechComponent } from './components/mediatech/mediatech.component';
import { UploadManagerComponent } from './components/upload-manager/upload-manager.component';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {SecureInnerPagesGuard} from "./services/secure-inner-pages.guard";
import {AuthGuard} from "./services/auth.guard";
import {AuthService} from "./services/auth.service";
import { MediatechListComponent } from './components/mediatech-list/mediatech-list.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    AddDepartementComponent,
    AddSiteComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    DepartementComponent,
    SiteComponent,
    EditDepartmentComponent,
    ReservationComponent,
    EditSiteComponent,
    SiteParDepartementComponent,
    MediatechComponent,
    UploadManagerComponent,
    UploadTaskComponent,
    DropzoneDirective,
    LoginComponent,
    RegisterComponent,
    MediatechListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        MatButtonModule,
        MatDialogModule,
        NgxPaginationModule,
        MatIconModule
    ],
  providers: [AuthService, AuthGuard, SecureInnerPagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
