import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/Property';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PropertyService } from 'src/app/services/propertyService/property.service';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {

  countries:Array<any> = [
    {
      name: 'Germany',
      states: [{name: 'North Rhine-Westphalia', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']}]
    },
    {name: 'Spain', states: [{name: 'Catalonia', cities: ['Barcelona']}]},
    {name: 'USA', states: [{name: 'Downers Grove', cities: ['Downers Grove']}]},
    {name: 'Mexico', states: [{name: 'Puebla estado', cities: ['Puebla']}]},
    {
      name: 'India', states: [{name: 'Delhi', cities: ['Delhi']},
      {name: 'Karnataka', cities: ['Bangalore', 'Mysore']}, {name: 'Maharashtra', cities: ['Mumbai']},
      {name: 'Uttar Pradhesh', cities: ['Kolkata']},
      {name: 'Telangana', cities: ['Hyderabad', 'Warangal']}, {name: 'Chennai', cities: ['Madras', 'Coimbatore']}, {
        name: 'Andhra Pradesh',
        cities: ['Vizag', 'Vijayawada']
      }]
    },
  ];

  public property:FormGroup;
  dataSource:Property[];
  selected = '';
  myFormGroup:any;
  imageSrc:string;
  selectedCountry:string;
  selectedFiles:Array<File> = [];
  selectedSrcFiles:Array<string> = [];
  cities:Array<any> = [];
  states:Array<any> = [];

  constructor(private router:Router, private service:PropertyService, private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<NewPropertyComponent>, public dialog:MatDialog, public loaderSer:LoaderService,
              public authService: AuthenticationService) {

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
      propertyType: new FormControl('New', []),
      image: new FormControl('', []),
    });
  }

  ngOnInit():void {
  }

  create(property) {
    this.loaderSer.showNgxSpinner();
    property.status = "NEW";
    property.owner = window.sessionStorage.getItem('loginId');
    this.service.Create(property).subscribe((data) => {
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

  onFileChange(event) {
    if (Math.round(event.target.files[0].size / 1024) < 100 && Math.round(event.target.files[0].size / 1024) > 10) {
      this.selectedFiles.push(event.target.files[0]);
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


  onUpload(image, pId) {

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', image, image.name);

    this.service.uploadPropertyImage(uploadImageData, pId).subscribe((response) => {
        if (response.status === 200) {
          this.loaderSer.showSucessSnakbar('Image uploaded successfully');
        } else {
          this.loaderSer.showSucessSnakbar('Image not uploaded successfully');
        }
      }
    );
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

  noImage() {
    this.imageSrc = 'D:/School App/front end/registrationWithMaterialdesign/src/assets/noImage.jpg';
  }

}
