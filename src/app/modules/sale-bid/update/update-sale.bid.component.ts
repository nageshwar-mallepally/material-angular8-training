import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleService } from 'src/app/services/propertyService/property.sale.service';
import { PropertySaleBidService } from 'src/app/services/propertyService/property.sale.bid.service';
import { AllSalePropertiesComponent } from 'src/app/modules/property-sale/all/all-sale.properties.component';

@Component({
  selector: 'app-update-bid-sale',
  templateUrl: './update-sale.bid.component.html',
  styleUrls: ['./update-sale.bid.component.css'],
})

export class UpdateSaleBidPropertyComponent implements OnInit {

  public bidSale: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<UpdateSaleBidPropertyComponent>, private service: PropertySaleBidService,
  private router: Router, public _snackBar: MatSnackBar,
  public loaderSer: LoaderService, private dialogSer: ConfirmationDialogService) {

    this.bidSale = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      requiredUnits: new FormControl('', [Validators.required]),
      priceQuotation: new FormControl('', [Validators.required]),
      propertySale: new FormControl('', []),
      property: new FormControl('', [])
    });
  }


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bidSale.patchValue({
      id: this.data.id,
      requiredUnits: this.data.requiredUnits,
      priceQuotation: this.data.priceQuotation,
      propertySale: this.data.propertySale,
      property: this.data.property
    });
  }

  update(bidSale) {
    this.loaderSer.showNgxSpinner();
    this.service.updateBidSale(bidSale.id, bidSale).subscribe((data) => {
      this.dialogRef.close('success');
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  };
}
