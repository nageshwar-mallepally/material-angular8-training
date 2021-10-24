import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertyService } from 'src/app/services/propertyService/property.service';
import { AllPropertiesComponent } from 'src/app/modules/property/all/all-properties.component';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css'],
})

export class UpdatePropertyComponent implements OnInit {

  countries:Array<any> = [
    {
      name: 'Germany',
      states: [{name: 'North Rhine-Westphalia', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']}]
    },
    {name: 'Spain', states: [{name: 'Catalonia', cities: ['Barcelona']}]},
    {name: 'USA', states: [{name: 'Downers Grove', cities: ['Downers Grove']}]},
    {name: 'Mexico', states: [{name: 'Puebla estado', cities: ['Puebla']}]},
    {
      name: 'India', states: [{name: 'Delhi', cities: ['Delhi', 'Kolkata', 'Mumbai', 'Bangalore']},
      {name: 'Karnataka', cities: ['Bangalore']}, {name: 'Maharashtra', cities: ['Mumbai']},
      {name: 'Uttar Pradhesh', cities: ['Kolkata']},
      {name: 'Telangana', cities: ['Hyderabad']}, {name: 'Chennai', cities: ['Madras']}, {
        name: 'Andhra Pradesh',
        cities: ['Vizag', 'Vijayawada']
      }]
    },
  ];

  public property: FormGroup;
  imageSrc: any;
  retrieveResonse: any;
  base64Data: any;
  selectedFile: File;
  id: number;
  editImage: any;
  selectedFiles:Array<File> = [];
  selectedSrcFiles:Array<string> = [];
  cities:Array<any> = [];
  states:Array<any> = []
  selectedCountry:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePropertyComponent>, private service: PropertyService,
    private router: Router, public _snackBar: MatSnackBar,
    public loaderSer: LoaderService, private dialogSer: ConfirmationDialogService) {
      this.property = this.formBuilder.group({
      propertyId: new FormControl('', [Validators.required]),
      name: new FormControl('', []),
      units: new FormControl('', []),
      category: new FormControl('', []),
      direction: new FormControl('', []),
      address: new FormControl('', []),
      addressType: new FormControl('', []),
      city: new FormControl('', []),
      //state: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}'), Validators.maxLength(10)]],
      state: new FormControl('', []),
      country: new FormControl('', []),
      district: new FormControl('', []),
      pincode: new FormControl('', []),
      propertyType: new FormControl('', []),
      image: new FormControl('', []),
      id: new FormControl('', []),
      owner: new FormControl('', []),
      modifiedBy: new FormControl('', []),
      createdBy: new FormControl('', [])
    });
    }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.property.patchValue({
      id: this.data.id,
      propertyId: this.data.propertyId,
      name: this.data.name,
      units: this.data.units,
      category: this.data.category,
      direction: this.data.direction,
      address: this.data.address,
      addressType: this.data.addressType,
      city: this.data.city,
      state: this.data.state,
      country: this.data.country,
      district: this.data.district,
      pincode: this.data.pincode,
      propertyType: this.data.propertyType,
      owner: this.data.owner,
      modifiedBy: this.data.modifiedBy,
      createdBy: this.data.createdBy
    });
    this.id = this.data.id;
    /*this.FMExpired = this.data.fatherMotherExpired;
    this.isRteProperty = this.data.rteProperty;
    this.isSiblings = this.data.siblings;
    this.property.setControl('siblingInformation', this.setExistsSiblingInformation(this.data.siblingInformation));
    this.id = this.data.id;*/

    this.data.propertyImages.find((file) => this.addFile(file));
    this.editImage = false;
  }

  addFile(file){
    let imageSrc1 = 'data:image/jpeg;base64,' + file.image;
    this.selectedFiles.push(file);
    this.selectedSrcFiles.push(imageSrc1);
  }

  /*update(property) {
    this.loaderSer.showNgxSpinner();
    this.service.updateProperty(property.id, property).subscribe((data) => {
      this.dialogRef.close('success');
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  }*/

  update(property) {
    this.loaderSer.showNgxSpinner();
    this.service.updateProperty(property.id, property).subscribe((data) => {
      if (this.selectedFiles.length > 0 && data.id != null && data.id != undefined) {
        this.selectedFiles.find((file) => this.onUpload(file, data.id));
      }
      this.dialogRef.close('success');
      this.loaderSer.hideNgxSpinner();
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  }

  fileValidate(event) {
    let isValid = false;

    if (Math.round(event.target.files[0].size / 1024) < 70 && Math.round(event.target.files[0].size / 1024) > 40) {
      isValid = true;
    } else {
      isValid = false;
      this.loaderSer.showNormalSnakbar("Image size should be beteen 40kb to 70 kb");
    }
    return isValid;
  }

    onFileChange(event) {
      if (Math.round(event.target.files[0].size / 1024) < 100 && Math.round(event.target.files[0].size / 1024) > 10) {
        this.selectedFiles.push(event.target.files[0]);
        this.editImage = true;
        const reader = new FileReader();
        //this.selectedSrcFiles.push(reader.result as string);
        if (event.target.files && event.target.files.length) {
          const [image] = event.target.files;
          reader.readAsDataURL(image);
          reader.onload = () => {
            this.selectedSrcFiles.push(reader.result as string);
            this.property.patchValue({
              image: JSON.stringify(reader.result)
            });
          };
        }
      } else {
        this.loaderSer.showNormalSnakbar("Image size should be beteen 10kb to 1 mb");
      }
    }

  deleteImage() {

    const msg = `Are you sure you want to delete this image ?`;
    const title = "Image Deletion Confirm Action";

    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {
      if (res) {
        this.loaderSer.showNgxSpinner();
        this.service.deleteImage(this.id).subscribe((data) => {
          this.imageSrc = null;
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showSucessSnakbar("Image delete succesfully");
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        });
      }
    });
  }

  onUpload(image, pId) {

    const uploadImageData = new FormData();

    if(image.id == null){
      uploadImageData.append('imageFile', image, image.name);

      this.service.uploadPropertyImage(uploadImageData, pId).subscribe((response) => {
          if (response.status === 200) {
            this.loaderSer.showSucessSnakbar('Image uploaded successfully');
          } else {
            this.loaderSer.showSucessSnakbar('Image not uploaded successfully');
          }
        }
      );
    }
    /*const image = new FormData();
     image.append('imageFile', this.selectedFile, this.selectedFile.name);

     this.service.uploadImage(id, image).subscribe((data) => {
     this.dialogRef.close('success');
     console.log("image uploaded succesfully");
     this.loaderSer.hideNgxSpinner();
     }, (error) => {
     console.log("image uploaded failure");
     this.loaderSer.hideNgxSpinner();
     });*/
  }


  changeCountry(country) {
    this.selectedCountry = country.name;
    //this.states = this.countries.find(cntry => cntry.name == country).states;
    this.states = this.countries.find((cntry:any) => cntry.name == country.name).states;
  }


  changeState(state) {
    this.cities = this.countries.find((cntry:any) => cntry.name == this.selectedCountry).states.find((stat:any) => stat.name == state.name).cities;
  }

  /*newImageUpload(event){
    if (this.fileValidate(event)) {
      this.loaderSer.showNgxSpinner();
      this.selectedFile = event.target.files[0];
      const image = new FormData();
      image.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.service.uploadImage(this.id, image).subscribe((data) => {
        this.retrieveResonse = data;
        this.base64Data = this.retrieveResonse.picByte;
        this.imageSrc = 'data:image/png;base64,' + this.base64Data;
        this.loaderSer.hideNgxSpinner();
        this.loaderSer.showSucessSnakbar("Image uploaded succesfully");
      }, (error) => {
        console.log(error);
        this.loaderSer.hideNgxSpinner();
        this.loaderSer.showFailureSnakbar(error.error.message);
      })
    }
  }*/
}
