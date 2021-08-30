import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../core/services';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }
  newsId: any = ''
  newsData: any = {};
  newsComments: any = []
  isAddComment: boolean = false;
  commentForm = new FormGroup({
    content: new FormControl(),
  });
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.newsId = params['id']
      this.loadData(this.newsId);
    });
  }

  loadData(id) {
    this.getNews(id);
    this.getNewsComments(id)
  }

  addComment() {
    this.isAddComment = true
  }

  submit() {
    const data = {
      "authorName": 'user_' + this.getRandomString(6),
      "content": this.commentForm.value.content,
      "date": new Date().toISOString()
    }
    this.newsService.addComment(this.newsData.id, data).subscribe(
      (response) => {
        this.commentForm.reset();
        this.loadData(this.newsData.id);
      },
      (error: any) => {
        console.log('error occured');

      }
    );
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  getNewsComments(id) {
    this.newsService.getCommentsById(id).subscribe(
      (response) => {
        this.newsComments = response.data
      },
      (error: any) => {
        console.log('error occured');

      }
    );
  }

  getNews(id) {
    this.newsService.getById(id).subscribe(
      (response) => {
        this.newsData = response.data
      },
      (error: any) => {
        console.log('error occured');

      }
    );
  }

}
