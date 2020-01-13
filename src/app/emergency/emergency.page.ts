import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../service/app-service.service';
import { Contact } from '../service/Contact';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  lists: Contact[];
  constructor(private services: AppServiceService) { }

  ngOnInit() {
    this.services.getContact().subscribe(res=>{
      this.lists = res;
    });
  }

}
