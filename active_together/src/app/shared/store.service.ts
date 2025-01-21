import { Injectable } from '@angular/core';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public courses: Course[] = [];
  public coursesLoading: boolean = false;
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public registrationsLoading: boolean = false;
  public registrationSortOrder: 'asc' | 'desc' | 'none' = 'none';
  public registrationsLimit: number = 5;
}
