import { Owner } from "./Owner";

export class Item
{
name:string="";
description:string = "";
stargazers_count:number = 0;
open_issues:number = 0;
created_at:Date;
timeInterval:number = 0;
owner:Owner ;
}