import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { CommitteeComponent } from './committee/committee.component';


const routes: Routes = [
	{path:'', redirectTo: '/home', pathMatch: 'full'},
	{path:'home', component: HomeComponent},
	{path:'apply', component: ApplyComponent},
	{path:'committee', component: CommitteeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
