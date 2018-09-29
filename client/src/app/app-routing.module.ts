import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
// import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { AdminAuthGuard } from './guards/admin.auth.guard';

const appRoutes: Routes = [
    // ANONYMOUS USER
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    // NORMAL USERS

    // ADMIN USERS

    // FOR NORMAL AND ADMIN USER
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
