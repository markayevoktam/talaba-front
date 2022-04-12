import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FakultetComponent } from './entity/fakultet/fakultet.component';
import { GuruhComponent } from './entity/guruh/guruh.component';
import { LoyihaComponent } from './entity/loyiha/loyiha.component';
import { TalabaComponent } from './entity/talaba/talaba.component';
import { XarakterComponent } from './entity/xarakter/xarakter.component';
import { YunalishComponent } from './entity/yunalish/yunalish.component';
import { YutuqComponent } from './entity/yutuq/yutuq.component';

const routes: Routes = [
  {
    path:"fakultet",
    component: FakultetComponent
  },
  {
    path:"loyiha",
    component: LoyihaComponent
  }
  ,
  {
    path:"yutuq",
    component: YutuqComponent
  }
  ,
  {
    path:"xarakter",
    component: XarakterComponent
  }
  ,
  {
    path:"yunalish",
    component: YunalishComponent
  }
  ,
  {
    path:"guruh",
    component: GuruhComponent
  }
  ,
  {
    path:"talaba",
    component: TalabaComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
