import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GithubClientService } from 'services/github-client.service';
import { Repository } from 'src/models/Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[GithubClientService]

})
export class AppComponent implements OnInit {
  pageIndex = 1;
 isLoading:boolean=false;
  title = 'Trending Repo';
  repos:Repository = new Repository();
  constructor(private _ghService:GithubClientService){}
  ngOnInit()
  {
this.getPaged(this.pageIndex);
  }


  getPaged(pageIndex)
  {
    this.isLoading = true;
    this._ghService.getByPage(pageIndex)        .subscribe
    ((res:Repository)=>
    {
      res.items.forEach((v,i)=>{  
        
        try
        {
          v.timeInterval = this.getTimeInterval(v.created_at)

        }catch{}
      });
      this.repos.items = this.repos.items.concat( res.items);
      this.isLoading = false;
    },err=>this.isLoading=false);
  }

  getTimeInterval(created_at):number
  {
    let currentDate = new Date().getTime();
    let creationDate =  ( new Date(created_at)).getTime ();
    let miliSecondsPerDay =   (1000 * 60 * 60 * 24);
    let diffInMiliSeconds = currentDate- creationDate;
              // i am not sure if this is the correct way to calculate time interval
          // i will assume that it is time since creation
    return Math.ceil(diffInMiliSeconds /  miliSecondsPerDay)
     ;
        
  }

  onScroll(){
   this.pageIndex = this.pageIndex+1;
   this.getPaged(this.pageIndex);
  }
}


