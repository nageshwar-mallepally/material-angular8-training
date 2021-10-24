import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertySaleService } from 'src/app/services/propertyService/property.sale.service';
import { AllSalePropertiesComponent } from 'src/app/modules/property-sale/all/all-sale.properties.component';

@Component({
  selector: 'app-sale-update-property',
  templateUrl: './update-sale.property.component.html',
  styleUrls: ['./update-sale.property.component.css'],
})

export class UpdateSalePropertyComponent implements OnInit {

  public propertySale: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<UpdateSalePropertyComponent>, private service: PropertySaleService,
  private router: Router, public _snackBar: MatSnackBar,
  public loaderSer: LoaderService, private dialogSer: ConfirmationDialogService) {

  this.propertySale = this.formBuilder.group({
  saleUnits: new FormControl('', [Validators.required]),
  qtyPrice: new FormControl('', [Validators.required]),
  funded: new FormControl('', []),
  id: new FormControl('', []),
  property: new FormControl('', [])
});
}

ngOnInit(): void {
  this.loadData();
}

loadData() {
  this.propertySale.patchValue({
    id: this.data.id,
    saleUnits: this.data.saleUnits,
    qtyPrice: this.data.qtyPrice,
    funded: this.data.funded,
    property: this.data.property
  });

}

update(propertySale) {
  this.loaderSer.showNgxSpinner();
  this.service.updatePropertySale(propertySale.id, propertySale).subscribe((data) => {
    this.dialogRef.close('success');
    this.loaderSer.hideNgxSpinner();
  }, (error) => {
    console.log(error);
    this.loaderSer.hideNgxSpinner();
    this.loaderSer.showFailureSnakbar(error.error.message);
  })
};

}
