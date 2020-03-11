import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userDetails;
  vehicleTypeDetails=["Bike","Car"];
  rideDetails = [
    {rideId:0, empId: 'EMP001', vehicleType: "Bike", vehicleNo: "KAR001", vacantSeats: "2", time: new Date(), pickupPoint: "majestic", dropPoint: "electronic-city" },
    { rideId: 1, empId: 'EMP002', vehicleType: "Car", vehicleNo: "KAR002", vacantSeats: "2", time: new Date(), pickupPoint: "majestic", dropPoint: "electronic-city" }
  ];
  travelerEmpDetails=[
    {empId:'EMP001',date:new Date(),rideId:0}
  ];
  constructor() 
  {
    localStorage.setItem('rideDetails', JSON.stringify(this.rideDetails));
    localStorage.setItem('travelerEmpDetails', JSON.stringify(this.travelerEmpDetails));
  }
  getUserDetails()
  {
    this.userDetails=[
      {userName:'emp1@gmail.com',pwd:'123',empId:'EMP001'},
      { userName: 'emp2@gmail.com', pwd: '123', empId: 'EMP002' },
      { userName: 'emp3@gmail.com', pwd: '123', empId: 'EMP003' }
    ]
    return this.userDetails;
  }
  getRideDetails()
  {
    return JSON.parse(localStorage.getItem('rideDetails'));
  }
  getVehicleTypeDetails()
  {
    return this.vehicleTypeDetails;
  }
  addRideDetails(rideDetails)
  {
    //decrease the ride count
    rideDetails.rideId = this.rideDetails.length;
    this.rideDetails.push(rideDetails)
    localStorage.setItem('rideDetails', JSON.stringify(this.rideDetails));
  }
  getBookedRaidDetails()
  {
    return JSON.parse(localStorage.getItem('travelerEmpDetails'));
  }
}
