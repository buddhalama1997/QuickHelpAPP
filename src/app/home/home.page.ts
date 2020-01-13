import { Component, OnInit } from '@angular/core';
import { FirebaseFirestore } from 'angularfire2';
import { SourceData } from './../service/SourceData';
import { AppServiceService } from './../service/app-service.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  dataSource:SourceData[];
  constructor(private service: AppServiceService) { }
 ngOnInit() {
   this.service.getDetails().subscribe(res=>{
     this.dataSource = res;
   });
}
}