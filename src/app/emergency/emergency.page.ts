import { Component, OnInit } from '@angular/core';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { OfflineManagerService, Contact} from '../Service/offline-manager.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  contacts:Contact[];
  constructor(private services: OfflineManagerService, private callNumber: CallNumber) { }

  ngOnInit() {
    this.services.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.services.getContact().subscribe(devs => {
          this.contacts = devs;
        })
      }
    });
  }
  call1(){
    this.callNumber.callNumber("100", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
