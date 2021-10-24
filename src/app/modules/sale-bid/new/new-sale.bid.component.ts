import { Component, Inject, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SaleBid } from 'src/app/model/SaleBid';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleBidService } from 'src/app/services/propertyService/property.sale.bid.service';
import { PropertyService } from 'src/app/services/propertyService/property.service';

@Component({
  selector: 'app-new-bid-sale',
  templateUrl: './new-sale.bid.component.html',
  styleUrls: ['./new-sale.bid.component.css']
})
export class NewSaleBidComponent implements OnInit {

  public bidSale:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router:Router, private propertyService:PropertyService,
  private saleService:PropertySaleBidService, private formBuilder:FormBuilder, public dialogRef:MatDialogRef<NewSaleBidComponent>, public dialog:MatDialog, public loaderSer:LoaderService) {

    this.bidSale = this.formBuilder.group({
      requiredUnits: new FormControl('', [Validators.required]),
      priceQuotation: new FormControl('', [Validators.required])
    });
  }

  propertySale: any;

  ngOnInit():void {
      this.propertySale = this.data;
      this.bidSale.patchValue({
        priceQuotation: this.propertySale.qtyPrice,
      });
  }

  create(bidSale) {

  this.propertyService.getPropertyById(this.propertySale.property).subscribe((property) => {
    bidSale.property = property;
    bidSale.propertySale = this.propertySale;
    if(property.propertyType.toLowerCase() == "NEW".toLowerCase() && bidSale.priceQuotation < bidSale.propertySale.qtyPrice){
      this.loaderSer.showFailureSnakbar("For New Property bid price same as sale price");
    }else{
      this.loaderSer.showNgxSpinner();
      this.saleService.Create(bidSale).subscribe((data) => {
        this.dialogRef.close('success');
        this.loaderSer.hideNgxSpinner();
      }, (error) => {
        console.log(error);
        this.loaderSer.hideNgxSpinner();
        this.loaderSer.showFailureSnakbar(error.error.message);
      })
    }
  })
  }
}
