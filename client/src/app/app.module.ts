import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { CommitteeComponent } from './committee/committee.component';
import { ApplyService } from './apply.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplyComponent,
    CommitteeComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApplyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
