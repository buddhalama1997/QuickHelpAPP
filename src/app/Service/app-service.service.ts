import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { SourceData } from './SourceData';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { Contact } from './Contact';
import { Feedback } from './feedback';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private datasCollection: AngularFirestoreCollection<SourceData>;
  private datas: Observable<SourceData[]>;
  private contactCollection: AngularFirestoreCollection<Contact>;
  private contact: Observable<Contact[]>;
  
  private feedbackCollection: AngularFirestoreCollection<Feedback>
  private feedback: Observable<Feedback[]>
  constructor(fire: AngularFirestore) { 
    this.datasCollection = fire.collection<SourceData>('Data');
    this.datas = this.datasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
)

    this.contactCollection = fire.collection<Contact>('EmergencyContact');
    this.contact = this.contactCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
)
    this.feedbackCollection = fire.collection<Feedback>('Feedback');
    this.feedback = this.feedbackCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
)
   }
  getDetails(){
     return this.datas;
   }
  getDetail(id){
    return this.datasCollection.doc(id).valueChanges();
  }
  getContact(){
    return this.contact;
  }
  postFeedback(feedback: Feedback){
    return this.feedbackCollection.add(feedback);
  }
  getFeedback(id){
    return this.feedbackCollection.doc<Feedback>(id).valueChanges();
  }
  updatefeedback(feedback: Feedback, id: string) {
    return this.feedbackCollection.doc(id).update(feedback);
  }
}