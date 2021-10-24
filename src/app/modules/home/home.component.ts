import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { NewPropertyComponent } from 'src/app/modules/property/new/new-property.component';
import { Property } from 'src/app/model/Property';
import { PropertyService } from 'src/app/services/propertyService/property.service';
import { UpdatePropertyComponent } from 'src/app/modules/property/update/update-property.component';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['propertyId', 'name', 'units', 'category', 'direction', 'address', 'city', 'state', 'country', 'propertyType', 'status', 'Actions'];

  public dataSource = new MatTableDataSource<Property>();

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  sortProperty:'desc';
  id:any;
  propertyType:string;
  filterText = '';
  isAdmin:Boolean;
  userName:string;

  constructor(private service:PropertyService, public dialog:MatDialog, private route:ActivatedRoute, private loaderSer:LoaderService,
              private homeService:HomeService, private authService:AuthenticationService, private dialogSer:ConfirmationDialogService) {

    this.route.params.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit():void {
    this.loadData();

  }

  loadData() {
    this.isAdmin = window.sessionStorage.getItem('isAdmin') == "true";
    this.userName = window.sessionStorage.getItem('firstName');
    this.dataSource.filterPredicate = function (data, filter:string):boolean {
      return data.name.toLowerCase().includes(filter) ||
        data.propertyId.toString().includes(filter)
    };
    this.getAllProperties();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageable = {
    page: 0,
    size: 99999,
    sort: {
      field: "modifiedDate",
      order: "DESC"
    }
  };

  // ------------ Filter method ----------------//
  applyFilter(filterValue:string) {
    this.filterText = filterValue.trim();
    filterValue = this.filterText.toLowerCase();
    this.dataSource.filter = filterValue;
    this.getAllProperties();
  }

  getAllProperties() {
    if (this.isAdmin) {
      this.loaderSer.showNgxSpinner();
      this.service.getNewProperties(this.pageable).subscribe((data) => {
        this.dataSource.data = data.content;
        this.loaderSer.hideNgxSpinner();
      }, (error) => {
        console.log(error);
        this.loaderSer.hideNgxSpinner();
      });
    }

  }


  result:string = '';

  newProperty() {
    const dialogRef = this.dialog.open(NewPropertyComponent, {disableClose: true, hasBackdrop: true, width: '1000px'});
    dialogRef.beforeClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Property created Successfully");
      }
    });
  }

  ngOnDestroy() {
    this.loaderSer.isHomeActive.next(false);
  }

  approve(element) {
    const msg = `Are you sure you want to approve this property ?` + '  ' + element.name;
    const title = "Property Approve Confirm Action";

    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {
      if (res) {
        this.loaderSer.showNgxSpinner();
        element.status = 'APPROVE';
        this.service.updateProperty(element.id, element).subscribe((data) => {
          this.loaderSer.hideNgxSpinner();
          this.ngOnInit();
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        })
      }
    });
  }
}


