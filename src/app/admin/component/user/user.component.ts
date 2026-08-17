import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  tahrirRejim = false;
  surovBajarilmoqda = false;
  formOchiq = false;

  displayedColumns: string[] = [
    'id',
    'ism',
    'familiya',
    'login',
    'regVaqt',
    'oxirgiTashrif',
    'role',
    'amal',
  ];
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [],
      ism: ['', Validators.required],
      familiya: ['', Validators.required],
      login: ['', Validators.required],
      parol: ['', Validators.required],
      regVaqt: [],
      oxirgiTashrif: [],
      role: ['USER', Validators.required],
    });
    this.load();
  }
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof key == 'object') {
        key = key.value;
      }
    }
    this.userService.getAll(key).subscribe((data) => {
      this.dataSource = data;
    });
  }

  saqlash() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.surovBajarilmoqda = true;
    let user = this.userForm.getRawValue();
    let surov;
    if (this.tahrirRejim) surov = this.userService.update(user);
    else surov = this.userService.create(user);

    surov.subscribe(
      (data) => {
        this.tozalash();
        this.load();
        this.surovBajarilmoqda = false;
      },
      (error) => {
          this.surovBajarilmoqda = false;
        }
    );
  }
  tahrir(user: User) {
    this.userForm.reset(user);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }
  ochirish(user: User) {
    this.dialog
      .open(DeleteDialog)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.userService.deleteById(user.id).subscribe((data) => {
            this.load();
          });
        }
      });
  }
  tozalash() {
    this.userForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
