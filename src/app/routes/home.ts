import { Routes } from "@angular/router";
import { HomeComponent } from "../componenets/home/home.component";
import { HomeDetailsComponent } from "../componenets/home-details/home-details.component";
import { HomeListComponent } from "../componenets/home-list/home-list.component";

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        children: [
            { path: 'details', component: HomeDetailsComponent},
            { path: 'menu', component: HomeListComponent},
            { path: '', redirectTo: 'details', pathMatch: 'full' } 
        ],
    }
]