import { Component, OnInit } from '@angular/core';
import { Contact } from '../ServiceContact/Contact';
import { ContactServiceService } from '../ServiceContact/contact-service.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  lists: Contact[];
  constructor(private services: ContactServiceService, private callNumber: CallNumber) { }

  ngOnInit() {
    this.services.getContact().subscribe(res=>{
      this.lists = res;
    });
  }
  call1(){
    this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
