import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpService,
  NewsService
} from './services';


@NgModule({
  declarations: [
    // Components
  ],
  imports: [
    // Modules
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Modules
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // Services
    HttpService,
    NewsService,
  ]
})
export class CoreModule { }