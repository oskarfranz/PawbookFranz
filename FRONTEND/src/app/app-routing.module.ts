import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { PetsComponent } from './pages/pets/pets.component';
import { PetComponent } from './pages/pet/pet.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { NewpetComponent } from './pages/newpet/newpet.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'}, //ya me redirije a login
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'pets', component: PetsComponent, canActivate: [AuthGuard]},
  { path: 'pet', component: PetComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'newpet', component: NewpetComponent, canActivate: [AuthGuard]},
  { path: '404', component: NotFoundComponent},
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
