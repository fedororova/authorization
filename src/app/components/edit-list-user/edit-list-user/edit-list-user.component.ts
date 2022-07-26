import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/interfaces/user.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-edit-list-user',
  templateUrl: './edit-list-user.component.html',
  styleUrls: ['./edit-list-user.component.css'],
})
export class EditListUserComponent implements OnInit {
  public myForm: FormGroup;
  user: User = {
    id: 0,
    name: null,
    role: null,
    login: null,
    password: null,
  };
  users: User[] = [];
  id = '';
  roles = ['администратор', 'пользователь'];
  userAboutForm!: FormGroup;
  userIsExist = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id !== '' && this.checkUserExist(+this.id)) {
      this.userIsExist = true;
    }
    this.userAboutForm = this.fb.group({
      name: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  changeUser() {
    this.users.map((n) => (n.id === +this.id ? { ...this.user } : n)); // изменение пользователя

    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['/List']);
  }
  checkUserExist(id: number): Boolean {
    this.users = JSON.parse(localStorage.getItem('users') as string);

    var _user = this.users.find((user) => user.id === id);

    if (_user) {
      this.user = _user;
      return true;
    }
    return false;
  }
}
