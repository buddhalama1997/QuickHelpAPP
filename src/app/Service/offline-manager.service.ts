import { Injectable} from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export interface Contact {
  id: number;
  ContactName: string;
  Number: string;
  Image: string;
}
export class OfflineManagerService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  contacts = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) { 
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'EmergencyContact.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadContact();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getContact(): Observable<any[]> {
    return this.contacts.asObservable();
  }
  loadContact() {
    // let query = "SELECT * FROM EmergencyContact";
    return this.database.executeSql("SELECT * FROM EmergencyContact", []).then(data => {
      let contacts:Contact[];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          contacts.push({ 
            ContactName: data.rows.item(i).ContactName,
            id: data.rows.item(i).id,
            Number: data.rows.item(i).Number,
            Image: data.rows.item(i).Image
           });
        }
      }
      this.contacts.next(contacts);
    });
  }
}
