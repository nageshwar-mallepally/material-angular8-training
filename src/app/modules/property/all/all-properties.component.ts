import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CommonDialogComponent } from 'src/app/common-dialog/common-dialog.component';
import { Property } from 'src/app/model/Property';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertyService } from 'src/app/services/propertyService/property.service';
import { NewPropertyComponent } from 'src/app/modules/property/new/new-property.component';
import { NewPropertySaleComponent } from 'src/app/modules/property-sale/new/new-property.sale.component';
import { UpdatePropertyComponent } from 'src/app/modules/property/update/update-property.component';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css']
})
export class AllPropertiesComponent implements OnInit, AfterViewInit {

  displayedColumns = ['propertyId', 'name', 'ownerName','units', 'category', 'direction', 'address', 'city', 'state', 'country','propertyType', 'status', 'Actions'];

  public dataSource = new MatTableDataSource<Property>();

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  sortProperty:'desc';
  id:any;
  propertyType:string;
  filterText = '';
  isAdmin:Boolean;

  constructor(private service:PropertyService, public dialog:MatDialog, private route:ActivatedRoute, private loaderSer:LoaderService,
              private authService:AuthenticationService, private dialogSer:ConfirmationDialogService) {
    this.route.params.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit():void {
    this.loadData();
  }

  loadData() {
    this.isAdmin = window.sessionStorage.getItem('isAdmin') == "true";
    this.dataSource.filterPredicate = function (data, filter:string):boolean {
      return data.name.toLowerCase().includes(filter) ||
        data.propertyId.toString().includes(filter)
    };
    if (this.isAdmin) {
      this.getAllProperties();
    } else {
      this.getUserProperties();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  pageable = {
    page: 0,
    size: 1000,
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
    if (this.authService.isAdmin) {
      this.getAllProperties();
    } else {
      this.getUserProperties();
    }

  }

  getAllProperties() {
    this.loaderSer.showNgxSpinner();
    this.service.getProperties(this.pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });
  }

  getUserProperties() {
    this.loaderSer.showNgxSpinner();
    this.service.getUserProperties(window.sessionStorage.getItem('loginId'), this.pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });
  }


  edit(property) {
    const dialogRef = this.dialog.open(UpdatePropertyComponent, {
      data: property,
      disableClose: true,
      hasBackdrop: true,
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result == 'success') {
        // this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Property updated successfully") });
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Property Updated Successfully");
      }
    })
  }

  result:string = '';

  createSaleProperty(property) {

    const dialogRef = this.dialog.open(NewPropertySaleComponent, {
      data: property,
      disableClose: true,
      hasBackdrop: true,
      width: '400px'
    });
    dialogRef.beforeClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Sale Property created Successfully");
      }
    });

  }

  delete(element):void {
    const msg = `Are you sure you want to delete this property ?` + '  ' + element.name;
    const title = "Property Deletion Confirm Action";
    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {
      if (res) {
        this.loaderSer.showNgxSpinner();
        element.status = 'DELETED';
        this.service.delete(element.id).subscribe((data) => {
          this.ngOnInit();
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showSucessSnakbar(element.name + " Deleted Successfully");
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        })
      }
    });


  }

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

  export() {
    this.loaderSer.showNgxSpinner();
    this.loaderSer.hideNgxSpinner();
  }


  openBigImage(ob) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {

      data: {ob, title: "image"},
    });

  }

}

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {
  constructor() {
  }

  transform(value:string, search:string):string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="text-highlight">$1</strong>');
  }
}

