import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit {
  vehicleTypdeDetails;
  addRideForm: FormGroup;
  userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
  constructor(private service: AuthServiceService, private route:Router) {
    this.addRideForm=new FormGroup({
      vehicleType: new FormControl('Car', Validators.required),
      vehicleNo: new FormControl('KAR002', Validators.required),
      vacantSeats: new FormControl('3', Validators.required),
      time: new FormControl('', Validators.required),
      pickupPoint: new FormControl('Electronic city ', Validators.required),
      dropPoint: new FormControl('marathahalli', Validators.required)
    })
   }

  ngOnInit() {
    this.vehicleTypdeDetails=this.service.getVehicleTypeDetails();
  }
  addRideDetails(){
    var rideDetails=this.addRideForm.value;
    var currentDate=new Date();
    var time = rideDetails.time.split(":");
    rideDetails.empId = this.userDetails.empId;
    currentDate.setHours(time[0], time[1]);
    rideDetails.time = currentDate;
    this.service.addRideDetails(rideDetails);
    this.route.navigateByUrl('rideDetails');
  }
}
