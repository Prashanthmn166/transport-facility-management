import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RideDetailsComponent } from "./components/ride-details/ride-details.component";
import { AddRideComponent } from "./components/add-ride/add-ride.component";

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rideDetails', component: RideDetailsComponent },
  { path: 'pickupRide', component: RideDetailsComponent },
  { path: 'add-ride', component: AddRideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
