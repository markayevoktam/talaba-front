import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FakultetComponent } from './component/fakultet/fakultet.component';
import { GuruhComponent } from './component/guruh/guruh.component';
import { LoyihaComponent } from './component/loyiha/loyiha.component';
import { StudentComponent } from './component/student/student.component';
import { TalabaComponent } from './component/talaba/talaba.component';
import { UserComponent } from './component/user/user.component';
import { XarakterComponent } from './component/xarakter/xarakter.component';
import { YunalishComponent } from './component/yunalish/yunalish.component';
import { YutuqComponent } from './component/yutuq/yutuq.component';

@NgModule({
  declarations: [
    AdminComponent,
    FakultetComponent,
    GuruhComponent,
    LoyihaComponent,
    TalabaComponent,
    DashboardComponent,
    XarakterComponent,
    YunalishComponent,
    YutuqComponent,
    UserComponent,
    StudentComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
