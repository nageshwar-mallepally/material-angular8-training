import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPropertiesComponent, HighlightSearchPipe } from './modules/property/all/all-properties.component';
import { NewPropertyComponent } from './modules/property/new/new-property.component';
import { UpdatePropertyComponent } from './modules/property/update/update-property.component';
import { AllSalePropertiesComponent, HighlightSearchPipe1  } from './modules/property-sale/all/all-sale.properties.component';
import { NewPropertySaleComponent } from './modules/property-sale/new/new-property.sale.component';
import { UpdateSalePropertyComponent } from './modules/property-sale/update/update-sale.property.component';
import { AllSaleBidsComponent, HighlightSearchPipe2 } from './modules/sale-bid/all/all-sale.bids.component';
import { NewSaleBidComponent } from './modules/sale-bid/new/new-sale.bid.component';
import { UpdateSaleBidPropertyComponent } from './modules/sale-bid/update/update-sale.bid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './modules/material.module';
import { HttpInterceptorService } from './interceptors/HttpInterceptorService';
import { LoginComponent } from './modules/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './modules/home/home.component';
import { FlexModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { AdminComponent } from './modules/admin/admin.component';
import { OverlaySidePanelModule } from './components/overlay-side-panel/overlay-side-panel.module';
import { AdminSidepanelComponent } from './modules/admin/adminSidepanel/admin-sidepanel/admin-sidepanel.component';
import { ShortNamePipe } from './directives/shortNamePipe';

@NgModule({
  declarations: [
    AppComponent,
    AllPropertiesComponent,
    HighlightSearchPipe,
    NewPropertyComponent,
    UpdatePropertyComponent,
    AllSalePropertiesComponent,
    HighlightSearchPipe1,
    NewPropertySaleComponent,
    UpdateSalePropertyComponent,
    AllSaleBidsComponent, HighlightSearchPipe2,
    NewSaleBidComponent, UpdateSaleBidPropertyComponent,
    LoginComponent,
    HomeComponent,
    MatConfirmDialogComponent,
    CommonDialogComponent,
    AdminComponent,
    ShortNamePipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule, MatTabsModule, FlexModule,
    MatTableModule, MatDialogModule, MatFormFieldModule,
    MaterialModule, NgxSpinnerModule, OverlaySidePanelModule
  ],
  entryComponents: [
    AllPropertiesComponent, NewPropertyComponent, UpdatePropertyComponent,
    CommonDialogComponent, MatConfirmDialogComponent, AdminSidepanelComponent,
    AllSalePropertiesComponent, NewPropertySaleComponent, UpdateSalePropertyComponent,
    AllSaleBidsComponent, NewSaleBidComponent, UpdateSaleBidPropertyComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
