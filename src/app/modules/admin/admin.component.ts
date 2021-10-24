import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { OverlaySidePanelService } from 'src/app/components/overlay-side-panel/overlay-side-panel.service';
import { ConfirmationDialogService } from 'src/app/services/conformatioDialog/confirmation-dialog.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RoleService } from 'src/app/services/roleService/role.service';
import { UserService } from 'src/app/services/userService/user.service';
import { AdminSidepanelComponent } from './adminSidepanel/admin-sidepanel/admin-sidepanel.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  public userForm: FormGroup;
  public roleForm: FormGroup;
  type = 'user';
  opened; any;
  users: any;
  roles: any;
  editUserInfo: any;
  editRoleInfo: any;
  imageSrc:any;

  constructor(private _userSer: UserService, private _roleService: RoleService, private _overlaySidePanelService: OverlaySidePanelService,
    private formBuilder: FormBuilder, public loaderSer: LoaderService, private dialogSer: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllUers();
    this.getAllRoles();

    this.userForm = this.formBuilder.group({
      id: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', []),
      phoneNumber: new FormControl('', []),
      //phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}'), Validators.maxLength(10)]),
      image : new FormControl('', []),
      username: new FormControl('', []),
      password: new FormControl('', []),
      email: new FormControl('', []),
      roles: this.formBuilder.array([])
    })


    this.roleForm = this.formBuilder.group({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    })

  }


  ngAfterViewInit() {
    this._overlaySidePanelService.setContent(AdminSidepanelComponent);
  }

  public show(user): void {
    console.log(user);
    this._overlaySidePanelService.show();
  }

  getAllUers() {
    this._userSer.getallUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    }, (error) => {
      console.log(error);
    })
  }
  closeSidepanel() {
    document.getElementById("close").click();
  }

  create() {
    if (this.type == 'user') {
      this.editUserInfo = null;
      this.imageSrc =null;
      this.userForm.reset();
    } else {
      this.editRoleInfo = null;
      // this.userForm.reset();
    }

  }


  onFileSelected(event){
    // this.userForm.get('image').setValue(event.target.files[0]);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result.split('base64,')[1];
        this.userForm.controls['image'].setValue(this.imageSrc);
      };
    }
  }

  createUser(ob) {
    console.log(ob);
    // this.loaderSer.showNgxSpinner();
    // ob.append('image', this.userForm.get('image').value);
    console.log(ob.image);
    this._userSer.createUser(ob).subscribe((data) => {
      this.getAllUers();
      this.userForm.reset();
      this.imageSrc =null;
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showSucessSnakbar("User created successfully");
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })
  }

  public editUser(user): void {
    this.editUserInfo = user;
    this.userForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      username: user.username,
      password: user.password,
      email: user.email,
      roles: user.roles,
      image:user.image,
    });
    this.userForm.setControl('roles', this.setStuentsRoles(user.roles));
    this.imageSrc = user.image;
  }

  setStuentsRoles(roles: any): FormArray {
    const formArray = new FormArray([]);
    roles.forEach(s => {
      formArray.push(this.formBuilder.group({
        id: s.id,
        name: new FormControl(s.name, [Validators.required]),
      }));
    });
    return formArray;
  }



  UpdateUser(ob) {
    this.loaderSer.showNgxSpinner();
    this._userSer.updateUser(ob.id, ob).subscribe((data) => {
      this.getAllUers();
      console.log(data);
      // this.users=data;
      this.closeSidepanel();
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showSucessSnakbar("User Updated successfully");
    }, (error) => {
      console.log(error);
      this.loaderSer.hideNgxSpinner();
      this.loaderSer.showFailureSnakbar(error.error.message);
    })

  }

  delteUser(user, index: number) {
    const msg = `Are you sure you want to delete this user ?` + '  ' + user.firstName;
    const title = "User Deletion Confirm Action";

    this.dialogSer.openConfirmationDialog(msg, title).afterClosed().subscribe(res => {

      if (res) {
        this.loaderSer.showNgxSpinner();
        this._userSer.deleteUser(user.id).subscribe((data) => {
          this.users = this.users.splice(index, 1);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showSucessSnakbar(user.firstName + " Deleted Successfully");
        }, (error) => {
          console.log(error);
          this.loaderSer.hideNgxSpinner();
          this.loaderSer.showFailureSnakbar(error.error.message);
        })
      }


    });

  }



  uploadImage(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result.split('base64,')[1];
        this.userForm.controls['image'].setValue(e.target.result.split('base64,')[1]);
      };
    }
  }

  updateImage(event){
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result.split('base64,')[1];
        this.userForm.controls['image'].setValue(this.imageSrc);
      };
    }
  }

  deleteImage(){
    this.imageSrc = null;
    this.userForm.controls['image'].setValue(this.imageSrc);
  }




//-------------------------Role----------------------------
getAllRoles() {
  this._userSer.getallRoles().subscribe((data) => {
    console.log(data);
    this.roles = data;
  }, (error) => {
    console.log(error);
  })
}

}
