import { Routes } from "@angular/router";
import { LoginComponent } from '../componenets/login/login.component';
import { SignInComponent } from "../componenets/sign-in/sign-in.component";
import { SignupComponent } from "../componenets/signup/signup.component";
export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        children:[
            {path:'signin',component:SignInComponent},
            {path:'signup',component:SignupComponent}
                 ]
    }
]