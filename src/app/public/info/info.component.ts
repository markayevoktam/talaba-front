import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Talaba } from 'src/app/model/talaba';
import { PublicService } from 'src/app/service/public.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  talaba!: Talaba;


  constructor(private activatedRouter: ActivatedRoute, private publicService: PublicService) { }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data => {
      console.log(data);

      if (data && data["id"]) {
        this.publicService.getById(data['id']).subscribe((d: Talaba) => {
          this.talaba = d;
          console.log(d);

        })
      }
    })

  }

}
