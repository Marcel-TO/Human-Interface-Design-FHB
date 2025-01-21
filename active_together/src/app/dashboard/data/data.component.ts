import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatTooltipModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css',
})
export class DataComponent {
  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  public page: number = 0;
  public isRegistrationsLoading: boolean = false;

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
    console.log(this.storeService.courses);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / this.storeService.registrationsLimit);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  public onCancelRegistration(registrationId: any) {
    let result = this.backendService.cancelRegistration(registrationId, this.storeService.currentPage);
  }

  public onSortRegistrations() {
    console.log('Sort registrations');
    console.log(this.storeService.registrations);
    const newSortOrder = this.storeService.registrationSortOrder === 'asc' ? 'desc' : 'asc';
    this.backendService.sortRegistrations(newSortOrder);
    this.storeService.registrationSortOrder = newSortOrder;
    console.log(this.storeService.registrations);
  }
}
