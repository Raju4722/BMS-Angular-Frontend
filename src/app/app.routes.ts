import { Routes } from '@angular/router';
import { Navbar } from './Navbar/navbar';
import { HomeComponent } from './home/home';
import { MoviepageComponent } from './moviepage/moviepage.component';
export const routes: Routes = [
    { path: 'navbar', component: Navbar },
    {path:'explore/home/:location',component:HomeComponent},
    {path:'movie/:location/:movie', component:MoviepageComponent}
];