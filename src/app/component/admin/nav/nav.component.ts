import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router:Router){}
  onDisconnect(){
    localStorage.setItem("state", "disconnected");
    this.router.navigate(['/login']);
  }
}
