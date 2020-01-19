import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AppServiceService } from '../app/Service/app-service.service';
import { OfflineManagerService } from '../app/Service/offline-manager.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    AppServiceService,
    OfflineManagerService,
    SplashScreen,
    SQLitePorter,
    SQLite,
    Network,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
