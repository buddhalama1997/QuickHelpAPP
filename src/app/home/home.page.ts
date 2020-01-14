import { Component, OnInit } from '@angular/core';
import { SourceData } from './../service/SourceData';
import { AppServiceService } from './../service/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Source:SourceData[];
  constructor(private service: AppServiceService) { }
 ngOnInit() {
   this.service.getDetails().subscribe(res=>{
     this.Source = res;
   });
}
}