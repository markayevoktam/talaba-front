import { Component, OnInit } from '@angular/core';
import { TalabaService } from 'src/app/service/talaba.service';
import { rasmManzili } from 'src/app/shared/rasm.util';

/** Ochiq sayt: iqtidorli talabalar */
@Component({
  selector: 'app-talentd',
  templateUrl: './talentd.component.html',
  styleUrls: ['./talentd.component.scss']
})
export class TalentdComponent implements OnInit {

  talabalar: any[] = [];
  length = 0;
  yuklanmoqda = true;
  readonly yil = new Date().getFullYear();

  constructor(private talabaService: TalabaService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.yuklanmoqda = true;
    this.talabaService.getAllTalented({ page: 0, size: 200, sort: 'ball,desc' }).subscribe({
      next: data => {
        this.talabalar = data.content ?? [];
        this.length = data.totalElements ?? this.talabalar.length;
        this.yuklanmoqda = false;
      },
      error: () => { this.talabalar = []; this.yuklanmoqda = false; }
    });
  }

  getRasm(file: any): string {
    return rasmManzili(file);
  }

  trackById(_: number, t: any): number { return t.id; }
}
