import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService} from '../core/services';
declare var $: any; 
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private router : Router, private newsService : NewsService) { }
  isAdd:boolean = false;
  isEdit:boolean = false;
  @ViewChild('myModal') myModal;
  @ViewChild('skillsSetRef', { static: false }) 
  skillsSetRefElement: ElementRef;  
  tag:any='';
  tags:any[] = [];
  news:any = [];
  searchTags:any = null
  searchTitle:any = null
  newsForm = new FormGroup({
    authorName: new FormControl(),
    content: new FormControl(),
    date: new FormControl(new Date()),
    tags: new FormControl(),
    title: new FormControl(),
   }); 
   newsData : any = []
 
   ngOnInit(): void {
    
    this.isAdd = this.router.url === '/news/add'
    document.getElementById("closeModalButton").click();

    if(this.isAdd)
    {
      document.getElementById("openModalButton").click();
    } else{
      this.getAllNews(this.searchTags,this.searchTitle)
    }
  }

  applyFilter(){
    this.getAllNews(this.searchTags,this.searchTitle)
  }

  resetSearchFilter(){
    this.searchTitle = null
    this.searchTags = null
    this.getAllNews(this.searchTags,this.searchTitle)
  }

   dropSkill(index: any) {  
    this.tags.splice(index, 1);  
  }  
  
  getAllNews(searchTags,searchTitle){
    this.newsService.getAll(searchTags,searchTitle).subscribe(
      (response) => {
        this.newsData = response.data && response.data.length > 0 ? response.data : []
      },
      (error: any) => {
          console.log('error occured');
          
      }
    );
  }

  submit(){
    const requestBody = {
      "authorName": this.newsForm.value.authorName,
      "content": this.newsForm.value.content ,
      "date": new Date(this.newsForm.value.date).toISOString(),
      "tags": this.tags && this.tags.length>0 && this.tags.toString(),
      "title": this.newsForm.value.title
    }
    if(this.isAdd)
    {
      this.newsService.create(requestBody).subscribe(
        (response) => {
          this.resetFilter()
          this.getAllNews(this.searchTags,this.searchTitle)
        },
        (error: any) => {
            console.log('error occured');
            
        }
      );
    } else if(this.isEdit)
    {
      this.newsService.edit(this.news.id,requestBody).subscribe(
        (response) => {
          this.resetFilter()     
          this.getAllNews(this.searchTags,this.searchTitle)
        },
        (error: any) => {
            console.log('error occured');
            
        }
      );
    }    
  }

  resetFilter(){
    this.isEdit = false;
    this.isAdd = false;
    document.getElementById("closeModalButton").click();
    this.router.navigate(['/news'])
  }
   
  getDetails(id){
    this.router.navigate([`news/${id}`]);
  }

  editData(id:any)
  {
      console.log('editdata called');      
      this.newsService.getById(id).subscribe(
        (response) => {
          this.news = response.data
          this.newsForm.patchValue({
            "authorName": this.news.authorName,
            "content": this.news.content ,
            "date": this.news.date,
            "title": this.news.title,
          });
          this.tags = this.news.tags && this.news.tags.split(",");       
          this.isEdit = true
          document.getElementById("openModalButton").click();
        },
        (error: any) => {
            console.log('error occured');
            
        }
      );
      
  }

  deleteData(id:any)
  {
    this.newsService.delete(id).subscribe(
      (response) => {
        this.router.navigate(['/news']);
      },
      (error: any) => {
          console.log('error occured');
          
      }
    );
  }

  onTagKeydown() {  
    if (this.tag == "" || this.tag == null) return;  
    this.tags.push(this.tag);  
    this.tag = "";  
  }  

  skillsSetFocus() {  
    this.skillsSetRefElement.nativeElement.focus();  
  } 

}
