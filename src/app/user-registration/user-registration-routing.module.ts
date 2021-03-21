import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationComponent } from "./registration/registration.component";

const userRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
