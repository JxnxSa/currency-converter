import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  menuOpen = false;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.menuOpen = false; 
  }

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/login']); 
    this.menuOpen = false; 
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.menuOpen = false; 
    }
  }
}
