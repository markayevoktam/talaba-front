import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { GuruhService } from 'src/app/service/guruh.service';
import { LoyihaService } from 'src/app/service/loyiha.service';
import { TalabaService } from 'src/app/service/talaba.service';
import { XarakterService } from 'src/app/service/xarakter.service';

@Component({
  selector: 'app-talaba',
  templateUrl: './talaba.component.html',
  styleUrls: ['./talaba.component.scss']
})
export class TalabaComponent implements OnInit {

  talabaForm!: FormGroup;

  talabalar: any[] = [];
    tahrirRejim = false;
    formOchiq = false;
    guruhlar: any;
    xarakterlar:any;
    loyihalar: any;
    
    surovBajarilmoqda = false;
    
    displayedColumns: string[] = ['id', 'ism', 'familya', 'sharif','yosh','hudud','guruh','ball','oquvShakl','loyiha','xarakter','info','amal'];
    dataSource: any;
    filter = new FormControl('filter')
    
    length = 100;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;
    
    constructor(private fb: FormBuilder,
      private guruhService: GuruhService,
      private talabaService: TalabaService,
      private xarakterService: XarakterService,
      private loyihaService: LoyihaService,
      private snakBar: MatSnackBar) { }
    ngAfterViewInit(): void {
  
      this.load();
    }
    
    ngOnInit(): void {
    
    
      this.talabaForm = this.fb.group({
        id: [],
        ism: ['', Validators.required],
        familya: ['', Validators.required],
        sharif: ['', Validators.required],
        yosh: ['', Validators.required],
        hudud: ['',Validators.required],
        guruh:['', Validators.required],
        xarakter:['',Validators.required],
        oquvShakl:['',Validators.required],
        loyiha:['',Validators.required],
        ball:['',Validators.required],
        info: [''],
        amal: ['']
      });
    
      this.guruhService.getAll('').subscribe(data => {
        this.guruhlar = data.content;
      })
      this.xarakterService.getAll('').subscribe(data =>{
        this.xarakterlar=data.content;
      })
      this.loyihaService.getAll('').subscribe(data =>{
        this.loyihalar=data.content;
      })
      
    }
    
    load(key?: any) {
      if (!key) {
        key = '';
      } else {
        if (typeof (key) == 'object') {
          key = key.value;
        }
        console.log(key);
    
    
      }
      this.talabaService.getAll({
        key: key,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'id'
      }).subscribe(royxat => {
    
        console.log(royxat);
        this.talabalar = royxat.content;
    
        this.length = royxat.totalElements;
      });
    }
    
    saqlash() {
        this.surovBajarilmoqda = true;
        let talaba = this.talabaForm.getRawValue();
       
        talaba.guruh={
          id: talaba.guruh
        }
        talaba.xarakter={
          id: talaba.xarakter
        }
        talaba.loyiha={
          id: talaba.loyiha
        }

        let surov;
        if (this.tahrirRejim)
          surov = this.talabaService.update(talaba);
        else
          surov = this.talabaService.create(talaba);
    
    
        surov.subscribe(data => {
          this.tozalash();
          this.load();
          this.surovBajarilmoqda = false;
        },
          error => {
            this.snakBar.open("Xatolik ro'y berdi", "Ok");
            this.surovBajarilmoqda = false;
          })
    }
    ochirish(talaba: any) {
           if (confirm("Siz " + talaba.nom + "ni o'chirishga rozimisiz")) {
             this.talabaService.deleteById(talaba.id).subscribe(data => {
              this.load();
             })
           }
    }
    
    tahrirlash(talaba: any) {
      this.tahrirRejim = true;
      this.talabaForm.reset(talaba);
      this.formOchiq = true;
    }
    
    tozalash() {
      this.talabaForm.reset({});
      this.tahrirRejim = false;
      this.formOchiq = false;
    }

}
