import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { rasmManzili } from 'src/app/shared/rasm.util';

/** Ochiq sayt: "Bizning faxrimiz" — bitiruvchilar ro'yxati */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentlar: Student[] = [];
  key = '';
  length = 0;
  yuklanmoqda = true;
  readonly yil = new Date().getFullYear();
  private qidiruvTaymer?: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.yuklanmoqda = true;
    this.studentService.getAll({ key: this.key ?? '', page: 0, size: 200, sort: 'id,desc' }).subscribe({
      next: royxat => {
        this.studentlar = royxat.content ?? [];
        this.length = royxat.totalElements ?? 0;
        this.yuklanmoqda = false;
      },
      error: () => { this.studentlar = []; this.length = 0; this.yuklanmoqda = false; }
    });
  }

  qidir(): void {
    clearTimeout(this.qidiruvTaymer);
    this.qidiruvTaymer = setTimeout(() => this.load(), 300);
  }

  getRasm(file: any): string {
    return rasmManzili(file);
  }

  trackById(_: number, s: Student): number { return s.id; }
}
