import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { YutuqService } from 'src/app/service/yutuq.service';

@Component({
  selector: 'app-yutuq',
  templateUrl: './yutuq.component.html',
  styleUrls: ['./yutuq.component.scss']
})
export class YutuqComponent implements OnInit {
  yutuqlar: any[]=[];
  tahrirRejim=false;
  yutuqForm!: FormGroup;
  surovBajarilmoqda=false;
  formOchiq= false;

  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,
     private yutuqService: YutuqService
     ) { }
     ngAfterViewInit(): void {
  
      this.load();
    }

  ngOnInit(): void {
    this.yutuqForm=this.fb.group({
      id:[''],
      nom:['',Validators.required],
      info:['']
    });
  }

  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
  
  
    }
    this.yutuqService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
  
      this.yutuqlar = royxat.content;
  
      this.length = royxat.totalElements;
    });
  }
  
  saqlash() {
    if (this.yutuqForm.invalid) {
      this.yutuqForm.markAllAsTouched();
      return;
    }

    this.surovBajarilmoqda = true;
    let yutuq = this.yutuqForm.getRawValue();
    let surov;
    if (this.tahrirRejim)
      surov = this.yutuqService.update(yutuq);
    else
      surov = this.yutuqService.create(yutuq);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
          this.surovBajarilmoqda = false;
        })
}
ochirish(yutuq: any) {
       if (confirm("Siz " + yutuq.nom + "ni o'chirishga rozimisiz")) {
         this.yutuqService.deleteById(yutuq.id).subscribe(data => {
          this.load();
         })
       }
}

tahrirlash(yutuq: any) {
  this.tahrirRejim = true;
  this.yutuqForm.reset(yutuq);
  this.formOchiq = true;
}

tozalash() {
  this.yutuqForm.reset({});
  this.tahrirRejim = false;
  this.formOchiq = false;
}
}
