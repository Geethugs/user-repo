import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationRoutingModule } from "./user-registration-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { MatSliderModule } from '@angular/material/slider';
const components = [
  HomeComponent,
  RegistrationComponent,
  ProfileComponent
];
const modules = [RegistrationRoutingModule, ReactiveFormsModule, CommonModule, MultiSelectModule,
  MatSliderModule,
  InputMaskModule];
@NgModule({
  declarations: components,
  imports: modules
})
export class RegistrationModule { }
