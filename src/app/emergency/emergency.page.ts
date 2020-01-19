import { Component, OnInit } from '@angular/core';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppServiceService } from '../service/app-service.service';
import { Contact } from '../service/Contact';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  lists: Contact[];
  constructor(private services: AppServiceService, private callNumber: CallNumber) { }

  ngOnInit() {
    this.services.getContact().subscribe(result=>{
      this.lists = result;
    });
  }
  call1(){
    this.callNumber.callNumber("100", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
