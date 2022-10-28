import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseUrls } from 'src/app/base-urls';
import { Category } from 'src/app/models/category';
import { DbService, Response } from 'src/app/services/db.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  loader: boolean = false;
  updation: boolean = false;

  categories: Category[] = [];
  selectedCategoryModel: Category;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DbService,
    // private aws: AwsService,
    private http: HttpClient,
    private modalService: NgbModal,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.db.getCategories();
    this.db.categories.subscribe((list) => {
      if(list.length !== 0) this.categories = list;
    });
  }

  openDeleteModal(modal: any, categoryObj: Category){
    this.selectedCategoryModel = categoryObj;
    this.modalService.open(modal, {size: 'sm'});
  }

  openCategoryModal(modalRef: any, categoryModel: any = null) {
    this.modalService.open(modalRef, { size: 'md' });
    this.initializeForm(categoryModel);
  }


  initializeForm(categoryModel: Category) {
    if(categoryModel === null) {
      this.updation = false;
      this.categoryForm = this.fb.group({
        categoryId: [],
        categoryName: [''],
        categoryDescription: [''],
        catgeoryImageUrl: [''],
        active: [1],
        addedOn: [new Date()],
        images: this.fb.array([])
      });
    } else {
      this.updation = true;
      this.categoryForm = this.fb.group({
        categoryId: [categoryModel.categoryId],
        categoryName: [categoryModel.categoryName],
        categoryDescription: [categoryModel.categoryDescription],
        catgeoryImageUrl: [categoryModel.catgeoryImageUrl],
        active: [categoryModel.active],
        addedOn: [new Date(categoryModel.addedOn)]
      });
    }
  }

  async saveCategory() {
    this.loader = true;
    let values = { ...this.categoryForm.value };
    
    console.log(values);
    

    let formData = new FormData();
    Object.entries(values).forEach(([key, value]: [string, any], idx: number) => formData.append(key, value))
    
    if(!this.updation) {
      this.http.post<Response>(BaseUrls.getAddUrl(BaseUrls.CATEGORIES_GROUPURL), formData)
      .subscribe({
        next: ({ data }) => {
          this.loader = false;
          this.categories.push(data[0]);
          this.toast.success("Category Added", "Success");
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.log(error);
          
          this.loader = false;
          this.toast.warning("Something went wrong!!", "Failed")
        }
      })
    } else {
      this.http.post<Response>(BaseUrls.getUpdateUrl(BaseUrls.CATEGORIES_GROUPURL), formData)
      .subscribe({
        next: ({ data }) => {
          this.loader = false;
          this.categories[this.categories.findIndex(x => x.categoryId === data[0].categoryId)] = { ...data[0] }
          this.toast.success("Category Updated", "Success");
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
    this.http.get(`${BaseUrls.getDeleteUrl(BaseUrls.CATEGORIES_GROUPURL)}/${id}`)
    .toPromise()
    .then(() => {
      let idx = this.categories.findIndex((x) => x.categoryId == id);
      this.categories.splice(idx,1);
      this.loader = false;
      this.modalService.dismissAll();
    })
    .catch((err) => {
      this.loader = false;
      this.toast.warning("Something went wrong. Please try again later!")
    })
  }

}
