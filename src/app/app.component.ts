import { Component } from '@angular/core';
import { AuthServiceService } from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'transport-facitity-management';
  constructor(private service: AuthServiceService){
    
  }
}
