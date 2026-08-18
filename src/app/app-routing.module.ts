import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessGuard } from './core/user-access.guard';
import { HomeComponent } from './public/home/home.component';
import { InfoComponent } from './public/info/info.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { StudentComponent } from './public/student/student.component';
import { TalentdComponent } from './public/talentd/talentd.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'info/:id',
    component: InfoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [UserRouteAccessGuard],
    // Token rollarni e'lon qilsa, faqat ADMIN kiritiladi; e'lon qilmasa tekshiruv backendda qoladi
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'talentd',
    component: TalentdComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
