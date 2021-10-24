import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { AllPropertiesComponent } from './modules/property/all/all-properties.component';
import { AllSalePropertiesComponent } from './modules/property-sale/all/all-sale.properties.component';
import { AllSaleBidsComponent } from './modules/sale-bid/all/all-sale.bids.component';
import { AuthGuardService } from './services/authGaurdService/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login',component:LoginComponent},
  {path: 'logout',component:LogoutComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'home/:rtes',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'properties/all',component:AllPropertiesComponent,canActivate:[AuthGuardService]},
  {path:'sale/properties/all',component:AllSalePropertiesComponent,canActivate:[AuthGuardService]},
  {path:'sale/bids/all',component:AllSaleBidsComponent,canActivate:[AuthGuardService]},
  {path:'sale/bids/all/:id',component:AllSaleBidsComponent,canActivate:[AuthGuardService]},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
