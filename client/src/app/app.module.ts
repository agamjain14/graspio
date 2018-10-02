import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AdminAuthGuard } from './guards/admin.auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { TaskComponent } from './component/task/task.component';
import { TaskService } from './services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatButtonModule, MatTableModule, MatInputModule, MatSortModule, MatSort } from '@angular/material';
import { TaskforuserComponent } from './component/taskforuser/taskforuser.component';
import { RevisionComponent } from './component/revision/revision.component';
import { RevisionService } from './services/revision.service';
import { AdminrevisionComponent } from './component/adminrevision/adminrevision.component';
import { ProfileeditComponent } from './component/profileedit/profileedit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    TaskComponent,
    TaskforuserComponent,
    RevisionComponent,
    AdminrevisionComponent,
    ProfileeditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    // GridModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
    // CdkTableModule
  ],
  providers: [RevisionService, AuthService, AuthGuard, NotAuthGuard, AdminAuthGuard, TaskService, MatSort],
  exports: [MatSelectModule, MatButtonModule, MatTableModule, MatInputModule, MatSortModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
