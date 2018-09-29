import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { AdminAuthGuard } from './guards/admin.auth.guard';
import { ProfileComponent } from './component/profile/profile.component';

const appRoutes: Routes = [
    // ANONYMOUS USER
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},

    // NORMAL USERS

    // ADMIN USERS

    // FOR NORMAL AND ADMIN USER
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Profile Route
    {path: '**', component: HomeComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
