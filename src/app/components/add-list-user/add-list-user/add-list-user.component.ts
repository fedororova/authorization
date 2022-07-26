import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list-user',
  templateUrl: './add-list-user.component.html',
  styleUrls: ['./add-list-user.component.css'],
})
export class AddListUserComponent implements OnInit {
  user: User = {
    id: 0,
    name: null,
    role: null,
    login: null,
    password: null,
  };
  users: User[] = [];
  roles = ['администратор', 'пользователь'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  saveUser() {
    this.users = JSON.parse(localStorage.getItem('users') as string);
    if (
      this.users?.length != 0 &&
      this.users[this.users.length - 1].hasOwnProperty('id')
    )
      this.user.id = this.users[this.users.length - 1].id + 1;
    else this.user.id = 0;

    this.users.push(this.user);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['/List']);
  }
}
