import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  public getCourses() {
    this.storeService.coursesLoading = true;
    this.http
      .get<Course[]>('http://localhost:5000/courses?_expand=eventLocation')
      .subscribe((data) => {
        this.storeService.courses = data;
        this.storeService.coursesLoading = false;
      });
  }

  public getRegistrations(page: number) {
    this.storeService.registrationsLoading = true;
    const options = {
      observe: 'response' as const,
      transferCache: {
        includeHeaders: ['X-Total-Count'],
      },
    };

    this.http
      .get<Registration[]>(
        `http://localhost:5000/registrations?_expand=course&_page=${page}&_limit=${this.storeService.registrationsLimit}`,
        options
      )
      .subscribe((data) => {
        this.storeService.registrations = data.body!;
        this.storeService.registrationTotalCount = Number(
          data.headers.get('X-Total-Count')
        );
        this.storeService.registrationsLoading = false;
      });
  }

  public addRegistration(registration: any, page: number) {
    console.log('Create registration: ', registration);
    this.storeService.registrationsLoading = true;
    this.http
      .post('http://localhost:5000/registrations', registration)
      .subscribe((_) => {
        this.getRegistrations(page);
      });

    return false;
  }

  public cancelRegistration(registration: any, currentPage: number) {
    console.log('Cancel registration: ', registration);
    this.storeService.registrationsLoading = true;
    this.http
      .delete(`http://localhost:5000/registrations/${registration}`)
      .subscribe((_) => {
        this.getRegistrations(currentPage);
        return true;
      });

    return false;
  }

  public sortRegistrations(order: string) {
    this.storeService.registrationsLoading = true;
    let sortedRegistrations = this.storeService.registrations.sort((a, b) => {
        if (order === 'asc') {
            return new Date(a.submitDatetime) > new Date(b.submitDatetime) ? 1 : -1;
        } else {
            return new Date(a.submitDatetime) < new Date(b.submitDatetime) ? 1 : -1;
        }
    });

    this.storeService.registrations = sortedRegistrations;
    this.storeService.registrationsLoading = false;
    this.storeService.registrationSortOrder = order as 'asc' | 'desc';
  }
}
