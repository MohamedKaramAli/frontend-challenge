import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trending Repo';
  repos:any = {items:[]};
  constructor(private  _httpClient:HttpClient){}
  ngOnInit()
  {
this.getByPage(1);
  }

  pageIndex = 1;
  getByPage( page:number)
  {

        let reposUrl=    "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
        if(page>1)
          reposUrl += "&page="+this.pageIndex

        this._httpClient.get(reposUrl)

        .subscribe
        ((res:any)=>
        {
          ((res.items) as any[]).forEach((v,i)=>{  
            let currentDate = new Date().getTime()
            try
            {
              let creationDate =  (new Date(v.created_at) ).getTime ();
              let miliSecondsPerDay =   (1000 * 60 * 60 * 24);
              let diffInMiliSeconds = currentDate- creationDate;
              v.timeInterval = Math.ceil(diffInMiliSeconds /  miliSecondsPerDay) ;
              // iam not sure if this is the correct way to calculate time interval
  
            }catch{}
          });
          this.repos.items = this.repos.items.concat( res.items);
        }
  
        )
  
      }
  onScroll(){
   this.pageIndex = this.pageIndex+1;
   this.getByPage(this.pageIndex)
  }
}


