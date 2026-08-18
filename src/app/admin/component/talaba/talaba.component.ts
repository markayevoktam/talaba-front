import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FaylService } from 'src/app/service/fayl.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { LoyihaService } from 'src/app/service/loyiha.service';
import { TalabaService } from 'src/app/service/talaba.service';
import { XarakterService } from 'src/app/service/xarakter.service';
import { environment } from 'src/environments/environment';
import { RASM_YOQ, rasmManzili } from 'src/app/shared/rasm.util';
import { YutuqService } from 'src/app/service/yutuq.service';

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
  xarakterlar: any;
  loyihalar: any;
  rasmManzil?: string;
  readonly rasmYoq = RASM_YOQ;
  /** Jadvaldagi rasm manzili */
  readonly rasmUrl = rasmManzili;
  surovBajarilmoqda = false;
  yutuqlar: any;

  displayedColumns: string[] = ['id', 'ism', 'familya', 'sharif', 'yosh','kurs', 'hudud', 'guruh', 'oquvShakl','yutuq','ball', 'loyiha', 'xarakter', 'info', 'amal'];

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  rasm: any;

  constructor(private fb: FormBuilder,
    private guruhService: GuruhService,
    private talabaService: TalabaService,
    private xarakterService: XarakterService,
    private loyihaService: LoyihaService,
    private snakBar: MatSnackBar,
    private faylService: FaylService,
    private yutuqService: YutuqService

  ) { }
  ngAfterViewInit(): void {
    this.load();
  }

  ngOnInit(): void {


    this.talabaForm = this.fb.group({
      id: [],
      ism: ['', Validators.required],
      familya: ['', Validators.required],
      sharif: ['', Validators.required],
      yosh: [''],
      hudud: [''],
      guruh: [''],
      xarakter: [''],
      oquvShakl: [ ],
      loyiha: [''],
      yutuq: [''],
      ball: [],
      talented: [false],
      info: [''],
      kurs: ['']
    });

    this.guruhService.getAll('').subscribe(data => {
      this.guruhlar = data.content;
    })
    this.xarakterService.getAll('').subscribe(data => {
      this.xarakterlar = data.content;
    })
    this.loyihaService.getAll('').subscribe(data => {
      this.loyihalar = data.content;
    })
    this.yutuqService.getAll('').subscribe(data=>{
      this.yutuqlar= data.content;
    })

  }

  rasmManzilOzgar() {
    this.rasmManzil = this.rasm
      ? environment.baseApi + "/api/file/download/" + this.rasm.id
      : undefined;
  }

  load(key?: any) {
    if (!key) {
      key = '';
    } else if (typeof (key) == 'object') {
      key = key.value;
    }

    this.talabaService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
      this.talabalar = royxat.content;
      this.length = royxat.totalElements;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      let img = new Image();
      let fr = new FileReader();
      fr.onload = (e: any)=>{
          img.onload = (ev)=>{
            if(Math.abs(img.width/img.height-0.75)<0.0001)
              {
                this.faylService.uploadFayl(file).subscribe(f=>{
                  this.rasm=f;
                  this.rasmManzilOzgar();
                })

              }   else {
                this.snakBar.open("Rasm 300x400 gacha bo'lishi zarur", "Ok");
              }
          }
          img.src = e.target?.result;
      };
      fr.readAsDataURL(file);

    }
  }

  saqlash() {
    if (this.talabaForm.invalid) {
      this.talabaForm.markAllAsTouched();
      return;
    }

    this.surovBajarilmoqda = true;
    let talaba = this.talabaForm.getRawValue();
    talaba.rasm = this.rasm;
    talaba.guruh = this.bogliqlik(talaba.guruh);
    talaba.xarakter = this.bogliqlik(talaba.xarakter);
    talaba.loyiha = this.bogliqlik(talaba.loyiha);
    talaba.yutuq = this.bogliqlik(talaba.yutuq);

    let surov;
    if (this.tahrirRejim)
      surov = this.talabaService.update(talaba);
    else
      surov = this.talabaService.create(talaba);

    surov.subscribe({
      next: () => {
        this.tozalash();
        this.load();
        this.surovBajarilmoqda = false;
      },
      error: () => this.surovBajarilmoqda = false
    })
  }

  /** Select'dan kelgan id'ni backend kutadigan {id} obyektiga o'giradi; tanlanmagan bo'lsa null */
  private bogliqlik(id: any) {
    if (id === null || id === undefined || id === '') {
      return null;
    }
    return { id: id };
  }



  ochirish(talaba: any) {
    if (confirm("Siz " + talaba.ism + "ni o'chirishga rozimisiz")) {
      this.talabaService.deleteById(talaba.id).subscribe(() => {
        this.load();
      })
    }
  }

  tahrirlash(talaba: any) {
    this.tahrirRejim = true;
    // Select'lar id bilan ishlaydi, backend esa to'liq obyekt qaytaradi
    this.talabaForm.reset({
      ...talaba,
      guruh: talaba.guruh?.id ?? '',
      xarakter: talaba.xarakter?.id ?? '',
      loyiha: talaba.loyiha?.id ?? '',
      yutuq: talaba.yutuq?.id ?? ''
    });
    this.rasm = talaba.rasm;
    this.rasmManzilOzgar();
    this.formOchiq = true;
  }

  tozalash() {
    this.talabaForm.reset({});
    this.rasm = undefined;
    this.rasmManzilOzgar();
    this.tahrirRejim = false;
    this.formOchiq = false;
  }









}

