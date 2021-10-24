import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatNativeDateModule, MatPseudoCheckboxModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { LogoutComponent } from './logout/logout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import {MatMenuModule} from '@angular/material/menu';
import { MdePopoverModule } from '@material-extended/mde';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdminSidepanelComponent } from './admin/adminSidepanel/admin-sidepanel/admin-sidepanel.component';

const MaterialComponents=[
  MatButtonModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatRadioModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatSlideToggleModule,
  MatMenuModule,
  MdePopoverModule,
  MatButtonToggleModule,

    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatCardModule,
    MatCardModule,
    MatPseudoCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    PortalModule,
    ScrollingModule,
]

@NgModule({
  imports: [ MaterialComponents ],
  exports:[ MaterialComponents],
  declarations: [LogoutComponent, AdminSidepanelComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class MaterialModule { }
