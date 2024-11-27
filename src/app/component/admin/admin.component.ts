import { Router,RouterOutlet } from '@angular/router';
import { Component } from "@angular/core";
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminDashboardComponent  {
  constructor(private router:Router){}
  onDisconnect(){
    localStorage.setItem("state", "disconnected");
    this.router.navigate(['/login']);
  }
}
