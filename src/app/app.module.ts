import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { MatTableModule, MatExpansionModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule, 
  MatListModule, MatIconModule, MatToolbar, MatToolbarModule, MatSnackBarModule } from '@angular/material';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { OrderListComponent } from './orders-list/orders-list.component';
import { MenuItemCreateComponent } from './menuItem-create/menuItem-create.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailComponent,
    MenuListComponent, OrderListComponent, MenuItemCreateComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule, MatTableModule, MatIconModule,
    MatInputModule, MatOptionModule, MatSelectModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
