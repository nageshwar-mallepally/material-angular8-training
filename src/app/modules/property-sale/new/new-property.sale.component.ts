import { Component, Inject, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertySale } from 'src/app/model/PropertySale';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleService } from 'src/app/services/propertyService/property.sale.service';

@Component({
  selector: 'app-new-property-sale',
  templateUrl: './new-property.sale.component.html',
  styleUrls: ['./new-property.sale.component.css']
})
export class NewPropertySaleComponent implements OnInit {

  public propertySale:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router:Router, private saleService:PropertySaleService, private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<NewPropertySaleComponent>, public dialog:MatDialog, public loaderSer:LoaderService) {

    this.propertySale = this.formBuilder.group({
      saleUnits: new FormControl('', [Validators.required]),
      qtyPrice: new FormControl('', [Validators.required]),
      propertyName: new FormControl('', [])
    });
  }

  property: any;

  ngOnInit():void {
      this.property = this.data;
      this.propertySale.patchValue({
        propertyName: this.property.name,
        saleUnits: this.property.units,
      });
  }

  create(propertySale) {
    propertySale.property = this.property.id;
    this.loaderSer.showNgxSpinner();
    this.saleService.Create(propertySale).subscribe((data) => {
      this.dialogRef.close('success');
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  }

}
