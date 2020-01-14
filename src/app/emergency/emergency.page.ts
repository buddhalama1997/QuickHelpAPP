import { Component, OnInit } from '@angular/core';
import { Contact } from '../ServiceContact/Contact';
import { ContactServiceService } from '../ServiceContact/contact-service.service';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  lists: Contact[];
  constructor(private services: ContactServiceService) { }

  ngOnInit() {
    this.services.getContact().subscribe(res=>{
      this.lists = res;
    });
  }
}
