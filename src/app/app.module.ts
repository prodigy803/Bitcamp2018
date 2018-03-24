import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MetaCoinService } from './services/meta-coin.service';
import { Web3Service } from './services/web3.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './shared/login/login.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { RegisterComponent } from './shared/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsComponent } from './buyer/products/products.component';
import { AdminComponent } from './admin/admin.component';
import { SellerComponent } from './seller/seller.component';
import { ApprovalComponent } from './admin/approval/approval.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';
import { BcComponent } from './bc/bc.component';
import { CheckbidsComponent } from './buyer/checkbids/checkbids.component';
import { CheckBidStatusComponent } from './seller/check-bid-status/check-bid-status.component';

const appRoutes: Routes = [
    // { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '',                     component: ComponentsComponent },
    { path: 'register',             component: RegisterComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'login',                component: LoginComponent },
    { path: 'profile',              component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'products',             component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'admin',                component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'seller',                component: SellerComponent, canActivate: [AuthGuard] },
    { path: 'approval',             component: ApprovalComponent, canActivate: [AuthGuard] },
    { path: 'delivery',             component: DeliveryComponent, canActivate: [AuthGuard] },
    { path: 'bc',             component: BcComponent, canActivate: [AuthGuard] },
    { path: 'checkbids',             component: CheckbidsComponent, canActivate: [AuthGuard] },
    { path: 'checkbidstatus',             component: CheckBidStatusComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        ProfileComponent,
        RegisterComponent,
        FooterComponent,
        ProductsComponent,
        AdminComponent,
        SellerComponent,
        ApprovalComponent,
        DeliveryComponent,
        BcComponent,
        CheckbidsComponent,
        CheckBidStatusComponent

    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [
      ValidateService,
      AuthService,
      AuthGuard,
      MetaCoinService,
      Web3Service
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
