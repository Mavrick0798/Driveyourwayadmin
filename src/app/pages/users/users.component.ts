import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from 'src/app/base-urls';
import { User } from 'src/app/models/user';
import { DbService, Response } from 'src/app/services/db.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loader: boolean = false;
  updation: boolean = false;
  validationBool: boolean = false;

  userForm: FormGroup;
  users: User[] = [];
  selectedUserModel: User;

  constructor(
    private db: DbService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.db.getUsers();
    this.db.users.subscribe((list: any) => {
      if (list.length !== 0) this.users = list;
    })
  }

  openUserModal(modal: any, userObj: any = null) {
    this.modalService.open(modal, { size: 'lg' })
    this.initializeForm(userObj);
  }

  openDeleteModal(modal: any, userObj: User){
    this.selectedUserModel = userObj;
    this.modalService.open(modal, {size: 'sm'});
  }

  initializeForm(userModel: User) {
    if (userModel === null) {
      this.updation = false;
      this.userForm = this.fb.group({
        userId: [null],
        email: [null],
        password: [null],
        fullName: [null],
        contact: [null],
        street: [null],
        country: [null],
        city: [null],
        pincode: [null],
        state: [null],
        subscriptionName: [null],
        subscriptionExpiry: [new Date()],
        addedOn: new Date(),
        image: [""],
      });
    } else {
      this.updation = true;
      this.userForm = this.fb.group({
        userId: [userModel.userId],
        email: [userModel.email],
        password: [userModel.password],
        fullName: [userModel.fullName],
        contact: [userModel.contact],
        street: [userModel.street],
        country: [userModel.country],
        city: [userModel.city],
        pincode: [userModel.pincode],
        state: [userModel.state],
        subscriptionName: [userModel.subscriptionName],
        subscriptionExpiry: [userModel.subscriptionExpiry],
        image: [userModel.image],
        addedOn: new Date(),
      });
    }
  }

  async saveUser() {
    this.loader = true;
    let values: User = { ...this.userForm.value };
    values.subscriptionExpiry = new Date(values.subscriptionExpiry);
    console.log(values);
    
    this.validationBool = this.users.some((x) => x.contact == values.contact);
    let formData = new FormData();
    Object.entries(values).forEach(([key, value]: [string, any], idx: number) => formData.append(key, value))
    
    if(!this.updation) {
      if(this.validationBool){
        this.toast.error("Phone Number Already Registered!")
        this.loader = false;
        this.modalService.dismissAll();
      } else {
        this.http.post<Response>(BaseUrls.getAddUrl(BaseUrls.USER_GROUPURL), formData)
          .subscribe({
            next: ({ data }) => {
              this.loader = false;
              this.users.push(data[0]);
              this.toast.success("User Added", "Success");
              this.modalService.dismissAll();
            },
            error: (error) => {
              console.log(error);
              
              this.loader = false;
              this.toast.warning("Something went wrong!!", "Failed")
            }
          }) 
      }
    } else {
      this.http.post<Response>(BaseUrls.getUpdateUrl(BaseUrls.USER_GROUPURL), formData)
      .subscribe({
        next: ({ data }) => {
          this.loader = false;
          this.users[this.users.findIndex(x => x.userId === data[0].userId)] = { ...data[0] }
          this.toast.success("User Updated", "Success");
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.log(error);
          
          this.loader = false;
          this.toast.warning("Something went wrong!!", "Failed")
        }
      })
    }    
  }

  deleteItem(id: any){
    this.loader = true;
    // BaseUrls.getDeleteUthi\
    this.http.get(`${BaseUrls.getDeleteUrl(BaseUrls.USER_GROUPURL)}/${id}`)
    .toPromise()
    .then(() => {
      let idx = this.users.findIndex((x) => x.userId == id);
      this.users.splice(idx,1);
      this.loader = false;
      this.modalService.dismissAll();
    })
    .catch((err) => {
      this.loader = false;
      this.toast.warning("Something went wrong. Please try again later!")
    })
  }

}
