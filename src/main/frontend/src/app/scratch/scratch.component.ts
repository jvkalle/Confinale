
import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {productRow} from "./productRow";
import {forEach} from "@angular/router/src/utils/collection";



@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.css']
})

export class ScratchComponent implements OnInit {
  // private productRow: ({ id: number; product: string; price: number; date: string; userId: number })[];
  private productRow : {
    id: number;
    product: string;
    price: number,
    date: Date,
    userId: number,
    index: number;
  };


  private productRows: productRow[];
  private currentRow: productRow;
  private currentIndex: number = -1;
  private emptyRow:productRow=  {
    id:undefined,product:undefined,price:undefined,date:undefined,userId:undefined
  };
  users: User[];

  loadedAt: string;

  constructor( private httpClient:HttpClient) {
    console.log("testLog");
    this.currentRow =  {... this.emptyRow};

    this.productRows = [
      {
        id:1,product:"Seife",price:5,date:"6.11.2018",userId:1
      },
      {
        id:2,product:"Kaffee",price:8,date:"4.11.2018",userId:2
  },
      {
        id:2,product:"Tee",price:4,date:"3.11.2018",userId:2
      }
    ];
  }
  calcTotal():number{
    let total:number = 0;
    for(let pr of this.productRows){
      total += pr.price;
    }
    return total;
  }

  onDeleteRow(pr : productRow) {
    this.productRows.splice(this.productRows.indexOf(pr), 1);
  }
  onEditRow(pr : productRow){
    this.currentRow = {... pr};
    this.currentIndex = this.productRows.indexOf(pr);
  }


  submitRow() {
    if (this.currentIndex === -1) {
      this.productRows.push(this.currentRow);
    }
    else {
      // replace
      this.productRows.splice(this.currentIndex,1,this.currentRow);
      this.currentRow = {... this.emptyRow};
      this.currentIndex = -1;

      //this.onDeleteRow(this.currentRow);
    }

  }



  ngOnInit() {
  }


  onLoadUsersButtonClick() {
    this.httpClient.get<User[]>("api/users")
    //NOTE: ideally, we should have an error handler here, which we left away for simplicity
      .subscribe(resp => {
        this.users = resp;
      });

    this.loadedAt = new Date().toLocaleTimeString();
  }

  removeUsers() {
    this.users = null;
  }
}
