import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DisplayContactsComponent } from './display-contacts/display-contacts.component';
import { AddModifyContactsComponent } from './add-modify-contacts/add-modify-contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DisplayContactsComponent },
  { path: 'add', component: AddModifyContactsComponent },
  { path: 'view/:id', component: AddModifyContactsComponent },
  { path: 'modify/:id', component: AddModifyContactsComponent },
  { path: '**', component: DisplayContactsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    DisplayContactsComponent,
    AddModifyContactsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
