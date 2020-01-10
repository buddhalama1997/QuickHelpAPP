import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { SourceData } from './SourceData';
import { Contact } from './Contact';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  formData: SourceData;
  contactData: Contact;
  constructor(private firestore: AngularFirestore) {  }
  getDetails() {
    return this.firestore.collection('Data').snapshotChanges();
  }
  getContact() {
    return this.firestore.collection('Contact').snapshotChanges();
  }
}