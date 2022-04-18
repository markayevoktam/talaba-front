import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Talaba } from 'src/app/model/talaba';
import { PublicService } from 'src/app/service/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  talabalar: Talaba[] = [];
  constructor(private publicService: PublicService) { }

  filter = new FormControl('filter')

  ngOnInit(): void {
    this.publicService.getAll(null).subscribe(data=>{
      this.talabalar = data.content;
    })
  }
  

}

