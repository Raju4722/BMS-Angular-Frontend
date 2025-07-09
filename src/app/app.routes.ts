import { Routes } from '@angular/router';
import { Navbar } from './Navbar/navbar';
import { HomeComponent } from './home/home';
export const routes: Routes = [
    { path: 'navbar', component: Navbar },
    {path:'explore/home/chittoor',component:HomeComponent}
];