import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './Contact';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  private contactCollection: AngularFirestoreCollection<Contact>;
  private contact: Observable<Contact[]>;
  constructor(fs: AngularFirestore) { 
    this.contactCollection = fs.collection<Contact>('Contact');
    this.contact = this.contactCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    )
  }
  getContact(){
    return this.contact;
  }
}
