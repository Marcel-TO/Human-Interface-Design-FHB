import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashbaordComponent } from './pages/dashbaord/dashbaord.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashbaordComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_demo';
}
