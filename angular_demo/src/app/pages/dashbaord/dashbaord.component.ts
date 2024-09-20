import { Component } from '@angular/core';
import { AddDataComponent } from '../../components/add-data/add-data.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DataComponent } from '../../components/data/data.component';

@Component({
  selector: 'app-dashbaord',
  standalone: true,
  imports: [AddDataComponent,ButtonComponent, DataComponent],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent {

}
