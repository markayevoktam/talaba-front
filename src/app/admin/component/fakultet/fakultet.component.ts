import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { FakultetService } from 'src/app/service/fakultet.service';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.scss']
})
export class FakultetComponent implements OnInit {
  fakultetForm!: FormGroup;
  fakultetlar: any[] = [];
  tahrirRejim = false;
  formOchiq = false;
  
  surovBajarilmoqda = false;
  
  displayedColumns: string[] = ['id', 'nom', 'info', 'amal'];
  
  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private fb: FormBuilder,
    private fakultetService: FakultetService) { }
  ngAfterViewInit(): void {
  
    this.load();
  }
  
  ngOnInit(): void {
  
  
    this.fakultetForm = this.fb.group({
      id: [],
      nom: ['', Validators.required],
      info: ['']
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
    this.fakultetService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
  
      this.fakultetlar = royxat.content;
  
      this.length = royxat.totalElements;
    });
  }
  
  saqlash() {
      if (this.fakultetForm.invalid) {
        this.fakultetForm.markAllAsTouched();
        return;
      }
      this.surovBajarilmoqda = true;
      let fakultet = this.fakultetForm.getRawValue();
      let surov;
      if (this.tahrirRejim)
        surov = this.fakultetService.update(fakultet);
      else
        surov = this.fakultetService.create(fakultet);
  
  
      surov.subscribe(data => {
        this.tozalash();
        this.load();
        this.surovBajarilmoqda = false;
      },
        error => {
          this.surovBajarilmoqda = false;
        })
  }
  ochirish(fakultet: any) {
         if (confirm("Siz " + fakultet.nom + "ni o'chirishga rozimisiz")) {
           this.fakultetService.deleteById(fakultet.id).subscribe(data => {
            this.load();
           })
         }
  }
  
  tahrirlash(fakultet: any) {
    this.tahrirRejim = true;
    this.fakultetForm.reset(fakultet);
    this.formOchiq = true;
  }
  
  tozalash() {
    this.fakultetForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
