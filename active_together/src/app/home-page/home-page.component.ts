import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddDataComponent } from '../dashboard/add-data/add-data.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCommonModule, MatButtonModule, RouterLink, RouterLinkActive, MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    readonly dialog = inject(MatDialog);

      openDialog() {
        const dialogRef = this.dialog.open(AddDataComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
