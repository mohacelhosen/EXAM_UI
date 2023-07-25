import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  userList!:User[];
  dataSource:any;
  displayedColumn:string[]=["id", "firstName", "lastName", "email", "dob", "gender", "designation","action"]
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  
  constructor(private service:ApiService, private dialog: MatDialog){
    this.loadUser();
  }

  loadUser() {
    this.service.getAllData().subscribe(user => {
      this.userList = user;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadUser();
    })
  }

  addUser(){
    this.Openpopup(0, 'Add Customer',PopupComponent);
  }

}
