import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Talaba } from 'src/app/model/talaba';
import { PublicService } from 'src/app/service/public.service';
import { TalabaService } from 'src/app/service/talaba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  talabalar: Talaba[] = [];
  key: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private publicService: PublicService,
    private talabaService:TalabaService
    ) { }

  ngOnInit(): void {
    this.publicService.getAll(null).subscribe(data=>{
      this.talabalar = data.content;

     
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


}

