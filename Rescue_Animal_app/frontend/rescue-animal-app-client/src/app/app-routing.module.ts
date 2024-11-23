import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditAnimalComponent } from './components/edit-animal/edit-animal.component';
import { AddAnimalComponent } from './components/add-animal/add-animal.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default
    { path: 'home', component: HomeComponent}, // Route to home page
    { path: 'add-animal', loadComponent: () => AddAnimalComponent }, // Route for adding animal
    { path: 'edit-animal/:id', component: EditAnimalComponent }, // Route for editing
    { path: 'current-animals', component: AnimalListComponent}, // Route for current animals
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
