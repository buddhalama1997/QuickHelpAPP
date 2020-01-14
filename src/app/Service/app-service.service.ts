import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { SourceData } from './SourceData';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private datasCollection: AngularFirestoreCollection<SourceData>;
  private datas: Observable<SourceData[]>;

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
   }
   getDetails(){
     return this.datas;
   }
   
}