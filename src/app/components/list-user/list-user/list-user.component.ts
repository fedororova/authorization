import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/interfaces/user.interface';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users?: User[] = JSON.parse(localStorage.getItem('users') as string);
  constructor( private modal: NzModalService) {}

  ngOnInit(): void {
    this.saveUser();
  }

  saveUser() {
    if (!this.users) {
      localStorage.setItem('users', `[]`);
    }
  }
  showModal(id: number, name: string) {
    this.modal.confirm({
      nzTitle: `Вы действительно хотите удалить пользователя ${name}?`,
      nzCancelText: 'Отмена',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(id),
    });

  }
  deleteUser(id: number) {
    const index = this.users.findIndex(n => n.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }

    localStorage.setItem('users', JSON.stringify(this.users))
  }
}
