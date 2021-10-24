import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CommonDialogComponent } from 'src/app/common-dialog/common-dialog.component';
import { SaleBid } from 'src/app/model/SaleBid';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleBidService } from 'src/app/services/propertyService/property.sale.bid.service';
import { UpdateSaleBidPropertyComponent } from 'src/app/modules/sale-bid/update/update-sale.bid.component';

@Component({
  selector: 'app-sale-bids-all',
  templateUrl: './all-sale.bids.component.html',
  styleUrls: ['./all-sale.bids.component.css']
})
export class AllSaleBidsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['propertyId', 'propertyName', 'ownerName','units', 'category', 'propertyType', 'saleUnits','funded', 'qtyPrice','requiredUnits', 'priceQuotation', 'Actions'];

  public dataSource = new MatTableDataSource<SaleBid>();

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  sortProperty:'desc';
  id:any;
  propertyType:string;
  filterText = '';
  salePropertyId:any;
  loginId:any;

  constructor(private service:PropertySaleBidService, public dialog:MatDialog, private route:ActivatedRoute, private loaderSer:LoaderService,
              private dialogSer:ConfirmationDialogService) {
    this.route.params.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit():void {
    this.salePropertyId = this.route.snapshot.params['id'];
    this.loginId = window.sessionStorage.getItem('loginId');
    this.loadData();
  }

  loadData() {
    this.dataSource.filterPredicate = function (data, filter:string):boolean {
      return data.requiredUnits.toString().toLowerCase().includes(filter) ||
        data.priceQuotation.toString().toLowerCase().includes(filter) ||
       data.property.name.toString().toLowerCase().includes(filter) ||
       data.property.propertyId.toString().toLowerCase().includes(filter)
    };
    this.getAllSaleBidProperties();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageable = {
    page: 0,
    size: 20,
    sort: {
      field: "priceQuotation",
      order: "DESC"
    }
  };

  applyFilter(filterValue:string) {
    this.filterText = filterValue.trim();
    filterValue = this.filterText.toLowerCase();
    this.dataSource.filter = filterValue;

    this.getAllSaleBidProperties();
  }

  getAllSaleBidProperties() {
    this.loaderSer.showNgxSpinner();
    if(this.salePropertyId == null){
      this.service.getPropertySaleBids(this.pageable).subscribe((data) => {
        this.dataSource.data = data.content;
        this.loaderSer.hideNgxSpinner();
      }, (error) => {
        console.log(error);
        this.loaderSer.hideNgxSpinner();
      });
    }else{
      this.service.getPropertySaleBidsBySale(this.salePropertyId, this.pageable).subscribe((data) => {
        this.dataSource.data = data;
        this.loaderSer.hideNgxSpinner();
      }, (error) => {
        console.log(error);
        this.loaderSer.hideNgxSpinner();
      });
    }
  }

  approve(bidSale) {
    this.loaderSer.showNgxSpinner();
    bidSale.status = "APPROVE";
    this.service.approveBid(bidSale.id, bidSale).subscribe((data) => {
      this.ngOnInit();
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  }

  edit(bidSale) {
    const dialogRef = this.dialog.open(UpdateSaleBidPropertyComponent, {
      data: bidSale,
      disableClose: true,
      hasBackdrop: true,
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result == 'success') {
        // this.dialog.open(SuccessMessageComponent, { width: "600px", panelClass: 'dialog-container-custom-success', data: new SuccessMessage("Property updated successfully") });
        this.ngOnInit();
        this.loaderSer.showSucessSnakbar("Sale Bid Updated Successfully");
      }
    })
  }

  result:string = '';

  delete(element):void {

    const msg = `Are you sure you want to delete this bid?`;
    const title = "Bid Deletion Confirm Action";

    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {

      if (res) {
        this.loaderSer.showNgxSpinner();
        element.status = 'DELETED';
        this.service.delete(element.id).subscribe((data) => {
          this.ngOnInit();
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showSucessSnakbar(element.property.name + " Deleted Successfully");
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        })
      }
    });
  }

}

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe2 implements PipeTransform {
  constructor() {
  }

  transform(value:string, search:string):string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="text-highlight">$1</strong>');
  }
}
