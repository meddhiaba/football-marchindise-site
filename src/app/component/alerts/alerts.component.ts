import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogModule,MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-alerts',
  standalone:true,
  imports:[MatDialogModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  close(): void {
    this.dialogRef.close();
  }
}
