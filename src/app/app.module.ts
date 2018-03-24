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
import { ApprovalComponent } from './admin/approval/approval.component';
import { DeliveryComponent } from './admin/delivery/delivery.component';

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
    { path: 'approval',             component: ApprovalComponent, canActivate: [AuthGuard] },
    { path: 'delivery',             component: DeliveryComponent, canActivate: [AuthGuard] }
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
        ApprovalComponent,
        DeliveryComponent

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
      AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
