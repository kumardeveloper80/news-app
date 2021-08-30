import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { GlobalConstants } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpService: HttpService,) {
  }

  create(data: any): Observable<any> {
    return this.httpService.post<Response>(GlobalConstants.ApiUrl.News.Create, data);
  }

  getAll(searchTags,searchTitle):Observable<any> {
    let queryParam = '' 
    if(searchTags || searchTitle) {
      queryParam +=`?`
    } 
    queryParam+= searchTags != null && searchTags !=undefined ? `tags=${searchTags}` : ''
    queryParam+= searchTitle != null && searchTitle !=undefined ? `&title=${searchTitle}` : '' 
    return this.httpService.get<Response>(GlobalConstants.ApiUrl.News.GetAll+queryParam);
  }

  getById(id):Observable<any> {
    return this.httpService.get<Response>(GlobalConstants.ApiUrl.News.Get + id);
  }

  edit(id:any,data:any) : Observable<any>{
    return this.httpService.patch<Response>(GlobalConstants.ApiUrl.News.Edit + id, data);
  }

  delete(id:any) : Observable<any>{
    return this.httpService.delete<Response>(GlobalConstants.ApiUrl.News.Delete + id);
  }

  addComment(newsId:any , data:any) : Observable<any> {
    return this.httpService.post<Response>(GlobalConstants.ApiUrl.News.AddComment + newsId , data);
  }

  getCommentsById(id):Observable<any> {
    return this.httpService.get<Response>(GlobalConstants.ApiUrl.News.GetComment + id);
  }


}