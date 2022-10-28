import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseUrls } from '../base-urls';
import { User } from '../models/user';

export class Response {
  code: any;
  message: any;
  data: any[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class DbService {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  usersRetreivedBool: boolean = false;

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  categoriesRetreivedBool: boolean = false;

  cars: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  carsRetreivedBool: boolean = false;


  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers() {
    this.httpClient.get(BaseUrls.getUrl(BaseUrls.USER_GROUPURL))
    .subscribe({
      next: ({code, data, message}: any) => {
        this.users.next(data);
        this.usersRetreivedBool = true;          
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCategories() {
    this.httpClient.get(BaseUrls.getUrl(BaseUrls.CATEGORIES_GROUPURL))
    .subscribe({
      next: ({code, data, message}: any) => {          
        this.categories.next(data);
        this.categoriesRetreivedBool = true;          
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCars() {
    this.httpClient.get(BaseUrls.getUrl(BaseUrls.CARS_GROUPURL))
    .subscribe({
      next: ({code, data, message}: any) => {          
        this.cars.next(data);
        this.carsRetreivedBool = true;          
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
