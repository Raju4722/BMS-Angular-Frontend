import { Routes } from '@angular/router';
import { Navbar } from './Navbar/navbar';
import { HomeComponent } from './home/home';
import { MoviepageComponent } from './moviepage/moviepage';
import { TheatrePageComponent } from './theatre-page/theatre-page';
import { MovieCategoriesComponent } from './movie-categories/movie-categories';
export const routes: Routes = [
    {path:'',component: Navbar},
    {path:'explore/home/:location',component:HomeComponent},
    {path:'movie/:location/:movie', component:MoviepageComponent},
    {path:'movies/:location/:movie/:lan/:type/buytickets/:date',component:TheatrePageComponent},
    {path:'explore/:uniq/movies/:location',component:MovieCategoriesComponent}
];