import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {
  rideDetails;
  showPickupDetails=false;
  vehicleTypdeDetails;
  constructor(private service: AuthServiceService, private routes: ActivatedRoute) 
  {
    console.log(this.routes.params);
    if (this.routes.url['_value'][0]['path'] =='pickupRide')
    {
      this.showPickupDetails = true;
      this.vehicleTypdeDetails = this.service.getVehicleTypeDetails();
    }    
   }

  ngOnInit() 
  {
    this.showRideDetails()
  }
  requestPickUp(rideId)
  {
    var bookedRaidDetail=this.service.getBookedRaidDetails();
    var userDetails=JSON.parse(localStorage.getItem('userDetails'))
    var currentDate=new Date();
    currentDate.setHours(0,0,0,0);
    //verify if the user already booked the ride
    if(bookedRaidDetail!=undefined)
    {
      var tempBookedDetails=bookedRaidDetail.filter(function(item){
        //compare only date
        var tempDate = new Date(item.date);
        tempDate.setHours(0, 0, 0, 0);
        if (item.empId == userDetails.empId && new Date(tempDate) == new Date(currentDate))
          return item;
      })
      if(tempBookedDetails.length>0)
      {
        alert("You cant book more than one ride");
        return false;
      }
    }
    var rideDetails = this.service.getRideDetails();
    
    rideDetails[rideId]['vacantSeats']=rideDetails[rideId]['vacantSeats']-1;
    //dont allow to pick up for the same employee
    if (rideDetails[rideId]['empId'] == userDetails.empId)
    {
      alert("You can't book your own ride");
      return false;
    }
      
    this.rideDetails=rideDetails;
    localStorage.setItem('rideDetails', JSON.stringify(this.rideDetails));
    bookedRaidDetail.push({ empId: userDetails.empId, date: new Date(), rideId: rideId })
    localStorage.setItem('travelerEmpDetails', JSON.stringify(bookedRaidDetail));
    alert("Requested for pickup successfully")
    this.showRideDetails();
  }
  //Change of vehicle type
  changeVehicleType(vehicleType)
  {
    var rideDetails = this.service.getRideDetails();
    this.rideDetails = rideDetails.filter(function (item) 
    {
      if(item.vehicleType == vehicleType.value || vehicleType.value=="all")
        return item;
    })
  }
  showRideDetails()
  {
    var rideDetails = this.service.getRideDetails();
    var minTime = new Date(new Date().setMinutes(new Date().getMinutes() - 60));
    var maxTime = new Date(new Date().setMinutes(new Date().getMinutes() + 60));
    console.log(minTime)
    if (this.showPickupDetails) 
    {
      this.rideDetails = rideDetails.filter(function (item) {
        //No of seat count should be greater than one and buffer time of 60 mins
        //debugger;
        if (item.vacantSeats > 0 && new Date(item.time) > minTime && new Date(item.time) < maxTime)
          return item;
      })
    }
    else
    {
      this.rideDetails = rideDetails;
    }
  }
  pickUpRide(rideId)
  {
    var empId=prompt("Please enter emp id");
    var rideDetails = this.service.getBookedRaidDetails();
    var verifyRideDetails=rideDetails.filter(function(item){
      if (item.empId == empId && item.rideId == rideId)
        return item;
    })
    if(verifyRideDetails.length==0)
    {
      alert("Booking details not found");
      return false;
    }
    else
    {
      alert("Enjoy the ride");
      return false;
    }
  }
}
