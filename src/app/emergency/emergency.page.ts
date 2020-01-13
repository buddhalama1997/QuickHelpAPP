import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../service/app-service.service';
import { Contact } from '../service/Contact';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
import { CallNumber } from '@ionic-native/call-number/ngx';
export class EmergencyPage implements OnInit {
  lists: Contact[];
  constructor(private services: AppServiceService, private callNumber: CallNumber) { }

  ngOnInit() {
    this.services.getContact().subscribe(action => {
      this.lists = action.map(item => {
        return {
          ...item.payload.doc.data()
        } as Contact;
      })
    })
  }

  call1(){
    this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
