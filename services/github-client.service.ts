import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubClientService {

  constructor(private  _httpClient:HttpClient) { }
  
  getByPage( page:number)
  {

        let reposUrl=    "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
        if(page>1)
          reposUrl += "&page="+page

        let subscribtion =  this._httpClient.get(reposUrl);
        return subscribtion;

  
      }
}
