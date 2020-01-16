import { Component, OnInit } from '@angular/core';
import { CONTENT } from '../content-data';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from '../service/app-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  con;

  index = 0;
  constructor(private route: ActivatedRoute, private services: AppServiceService) {}
  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.index = params.id;
    //   this.con = CONTENT[this.index];
    // }, err => {});


    this.con = this.route.snapshot.params['id'];
    if(this.con){
      this.loadContent();
    }
  }
  loadContent(){
    this.services.getDetail(this.con).subscribe(res => {
      this.con = res;
    })
  }
}
