import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DashbaordComponent } from './pages/dashbaord/dashbaord.component';
import { NotFoundComponent } from './pages/404/404.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'dashboard', component: DashbaordComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: NotFoundComponent}
];
