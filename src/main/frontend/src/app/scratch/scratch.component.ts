
import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {productRow, productRowLongDate } from "./productRow";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.css']
})

export class ScratchComponent implements OnInit {
  // private productRow: ({ id: number; product: string; price: number; date: string; userId: number })[];

  private productRows: productRow[];
  private currentRow: productRow;
  private currentIndex: number = -1;
  private emptyRow:productRow={id:undefined,product:undefined,price:undefined,date:undefined,userId:undefined};
  users: User[];

  loadedAt: string;

  constructor( private httpClient:HttpClient) {
    this.currentRow =  {... this.emptyRow};

  }

  getUserById(id:number):User{
      return this.users.filter(u=> u.id === id)[0];
  }

  calcTotalForUser(id: number): number {
    return this.productRows.filter(row => row.userId === id).map(row => row.price).reduce((a, o)=>a+o, 0);
  }

  calcTotal():number{
    let total:number = 0;
    for(let pr of this.productRows){
      total += pr.price;
    }
    return total;
  }

  onDeleteRow(pr : productRow) {
    //only for that it disappears instantly
    this.productRows.splice(this.productRows.indexOf(pr), 1);
    console.log(`api/purchases/${pr.id}`);
    this.httpClient.delete(`api/purchases/${pr.id}`).subscribe(resp => this.productRows = <productRow[]> resp);
    this.currentRow = {...this.emptyRow};
    this.currentIndex = -1;
  }
  onEditRow(pr : productRow){
    this.currentRow = {... pr};
    this.currentIndex = this.productRows.indexOf(pr);
  }



  submitRow() {
    //console.log("NEW DATE", this.currentRow.date);
    if (this.currentIndex  === -1) {
      //this.productRows.push(this.currentRow);

      this.httpClient.post("api/purchases", this.currentRow)
        .subscribe(resp => this.productRows = <productRow[]> resp);

    }
    else {
      // replace
      this.productRows.splice(this.currentIndex , 1, this.currentRow);
      this.httpClient.put(`api/purchases/${this.currentRow.id}`, this.currentRow)
        .subscribe(resp => this.productRows = <productRow[]> resp);
    }
    this.currentRow = {...this.emptyRow};
    this.currentIndex = -1;
  }



  ngOnInit() {
    this.productRows = [];
    this.onRefreshClicked();
  }


  onRefreshClicked() {
    this.httpClient.get<productRow[]>("api/purchases")
    //NOTE: ideally, we should have an error handler here, which we left away for simplicity
      .subscribe(resp => {
        this.productRows = resp;
      });
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

  onEqualize() {

  }
}
