import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  userList!: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumn: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'designation',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ApiService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
    this.loadUser();
  }

  loadUser() {
    this.service.getAllData().subscribe((user) => {
      this.userList = user;
      this.dataSource.data = this.userList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  addUser(){}

  editUser(email:string){
    console.log(email)
  }

  deleteUser(email: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(email).subscribe({
        next: () => {
          this.loadUser();
          // Delete successful, refresh the table
          console.log('User deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          // Handle error, show error message, etc.
        },
      });
    }
  }
}
