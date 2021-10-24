import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CommonDialogComponent } from 'src/app/common-dialog/common-dialog.component';
import { PropertySale } from 'src/app/model/PropertySale';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleService } from 'src/app/services/propertyService/property.sale.service';
import { NewPropertyComponent } from 'src/app/modules/property/new/new-property.component';
import { NewPropertySaleComponent } from 'src/app/modules/property-sale/new/new-property.sale.component';
import { NewSaleBidComponent } from 'src/app/modules/sale-bid/new/new-sale.bid.component';
import { UpdateSalePropertyComponent } from 'src/app/modules/property-sale/update/update-sale.property.component';

@Component({
  selector: 'app-sale-all-properties',
  templateUrl: './all-sale.properties.component.html',
  styleUrls: ['./all-sale.properties.component.css']
})
export class AllSalePropertiesComponent implements OnInit, AfterViewInit {

  displayedColumns = ['propertyId', 'propertyName', 'ownerName','units', 'category', 'propertyType','saleUnits', 'funded', 'qtyPrice', 'Actions'];

  public dataSource = new MatTableDataSource<PropertySale>();

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  sortProperty:'desc';
  id:any;
  propertyType:string;
  filterText = '';
  loginId:any;

  constructor(private service:PropertySaleService, public dialog:MatDialog, private route:ActivatedRoute, private loaderSer:LoaderService,
              private _router:Router, private dialogSer:ConfirmationDialogService) {
    this.route.params.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit():void {
    this.loadData();
  }

  loadData() {
    this.loginId = window.sessionStorage.getItem('loginId');
    this.dataSource.filterPredicate = function (data, filter:string):boolean {
      return data.saleUnits.toLowerCase().includes(filter) ||
        data.qtyPrice.toString().includes(filter) ||
        data.propertyName.toString().includes(filter) ||
        data.propertyId.toString().includes(filter)
    };
    this.getAllSaleProperties();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // const sortState: Sort = {active: 'propertyId', direction: 'desc'};
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
  }


  pageable = {
    page: 0,
    size: 20,
    sort: {
      field: "id",
      order: "DESC"
    }
  };


  applyFilter(filterValue:string) {
    this.filterText = filterValue.trim();
    filterValue = this.filterText.toLowerCase();
    this.dataSource.filter = filterValue;

    this.getAllSaleProperties();
  }

  getAllSaleProperties() {
    this.loaderSer.showNgxSpinner();
    this.service.getPropertySales(this.pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
    });
  }


  edit(propertySale) {
    const dialogRef = this.dialog.open(UpdateSalePropertyComponent, {
      data: propertySale,
      disableClose: true,
      hasBackdrop: true,
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result == 'success') {
        // this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Property updated successfully") });
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Sale Property Updated Successfully");
      }
    })
  }

  result:string = '';

  createSaleProperty(property){

    const dialogRef = this.dialog.open(NewPropertySaleComponent, {data: property, disableClose: true, hasBackdrop: true, width: '400px'});
    dialogRef.beforeClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Sale Property created Successfully");
      }
    });

  }

  delete(element):void {

    const msg = `Are you sure you want to delete this sale property ?`;
    const title = "Sale Property Deletion Confirm Action";

    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {

      if (res) {
        this.loaderSer.showNgxSpinner();
        element.status = 'DELETED';
        this.service.delete(element.id).subscribe((data) => {
          this.ngOnInit();
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showSucessSnakbar(element.propertyName + " Deleted Successfully");
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        })
      }
    });
  }

  createSaleBidProperty(propertySale){
    const dialogRef = this.dialog.open(NewSaleBidComponent, {data : propertySale, disableClose: true, hasBackdrop: true, width: '400px'});
    dialogRef.beforeClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (this.result == 'success') {
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Sale Bid created Successfully");
      }
    });
  }

  showBids(saleId){
      this._router.navigate(['/sale/bids/all/', saleId]);
  }
}

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe1 implements PipeTransform {
  constructor() {
  }

  transform(value:string, search:string):string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="text-highlight">$1</strong>');
  }
}

