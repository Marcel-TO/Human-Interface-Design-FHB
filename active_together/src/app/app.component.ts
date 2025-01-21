import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { BackendService } from './shared/backend.service';
import { StoreService } from './shared/store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SharedModule],
  providers: [BackendService, StoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    public storeService: StoreService
  ) {}

  ngOnInit(): void {
      this.storeService.coursesLoading = true;
      this.storeService.registrationsLoading = true;
      this.backendService.getCourses();
    this.backendService.getRegistrations(this.storeService.currentPage);
  }
}
