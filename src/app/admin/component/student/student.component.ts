import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { FaylService } from 'src/app/service/fayl.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { StudentService } from 'src/app/service/student.service';
import { YunalishService } from 'src/app/service/yunalish.service';
import { environment } from 'src/environments/environment';
import { RASM_YOQ } from 'src/app/shared/rasm.util';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentlar: any[] = [];
  tahrirRejim = false;
  studentForm!: FormGroup;
  surovBajarilmoqda = false;
  formOchiq = false;
  rasmManzil?: string;
  readonly rasmYoq = RASM_YOQ;
  rasm: any; 
  guruhlar: any;
  yunalishlar: any;

  displayedColumns: string[] = ['id', 'ism', 'familya', 'sharif' ,'hudud','yosh','ishlashJoyi','yunalish','oqishgaKirYil', 'guruh' , 'oquvShakl' ,'oqishTugYil','info','amal'];

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private faylService: FaylService,
    private guruhService: GuruhService,
    private yonalishService: YunalishService

  ) { }

  
  ngAfterViewInit(): void {

    this.load();
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [''],
      ism: ['', Validators.required],
      familya: ['', Validators.required],
      sharif: ['', Validators.required],
      hudud: ['', Validators.required],
      yosh: [],
      ishlashJoyi: [''],
      oqishgaKirYil: [],
      oquvShakl: ['', Validators.required],
      oqishTugYil: [''],
      guruh: ['',Validators.required],
      yunalish: ['',Validators.required],
      info: ['']
    });
   
    this.guruhService.getAll('').subscribe(data=>{
      this.guruhlar = data.content;
    })
    this.yonalishService.getAll('').subscribe(data=>{
      this.yunalishlar = data.content;
    })
  }

  rasmManzilOzgar() {
    this.rasmManzil = this.rasm
      ? environment.baseApi + "/api/file/download/" + this.rasm.id
      : undefined;
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    if(file){
      this.faylService.uploadFayl(file).subscribe(f=>{
        this.rasm=f;
        this.rasmManzilOzgar();
       
      })
    }

  }

  

  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }


    }
    this.studentService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      this.studentlar = royxat.content;

      this.length = royxat.totalElements;
    });
  }

  saqlash() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.surovBajarilmoqda = true;
    let student = this.studentForm.getRawValue();
    student.rasm = this.rasm;
    let surov;
    if (this.tahrirRejim)
      surov = this.studentService.update(student);
    else
      surov = this.studentService.create(student);
   

    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
          this.surovBajarilmoqda = false;
        })
  }
  ochirish(student: any) {
    if (confirm("Siz " + student.ism + "ni o'chirishga rozimisiz")) {
      this.studentService.deleteById(student.id).subscribe(data => {
        this.load();
      })
    }
  }

  tahrirlash(student: any) {
    this.tahrirRejim = true;
    this.studentForm.reset({ ...student, guruh: student.guruh?.id ?? '', yunalish: student.yunalish?.id ?? '' });
    this.rasm = student.rasm;
    this.rasmManzilOzgar();
    this.formOchiq = true;
  }

  tozalash() {
    this.studentForm.reset({});
    this.rasm = undefined;
    this.rasmManzilOzgar();
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
