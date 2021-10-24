import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor( private dialog:MatDialog) { }

  openConfirmationDialog(msg,title){
  return  this.dialog.open(MatConfirmDialogComponent, {
      width: '500px',
       data: {
         title : title,
         message : msg,
       },
      position: { top: '10px'},
      disableClose: true,
    });
  }
}
