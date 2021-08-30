import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../app/core/core.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NewsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NewsComponent,NewsDetailsComponent]
})
export class NewsModule { }
