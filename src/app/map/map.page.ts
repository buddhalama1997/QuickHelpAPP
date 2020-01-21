import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map:any;
  marker:any;
  latitude:any="";
  longitude:any="";
  timestamp:any="";

  constructor(public platform: Platform, public geolocation: Geolocation) { 
    this.platform.ready().then(()=>{
      var mapOptions={
        center:{lat:28.3949,lng:84.1240},
        zoom:7
      }
      this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
      this.GetLocation();
    })

  }

  ngOnInit() {
  }
  GetLocation(){
    var ref= this;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((position)=>{
      var gps = new google.maps.LatLng
      (position.coords.longitude);
      if(ref.marker == null)
      {
        ref.marker = new google.maps.Marker({
          position:gps,
          map:ref.map,
          title:'my position'
        })
      }
      else{
        ref.marker.setPosition(gps);
      }
      ref.map.panTo(gps);
      ref.latitude = position.coords.latitude.toString();
      ref.longitude = position.coords.longitude.toString();
      ref.timestamp = (new Date(position.timestamp)).toString();
    })
  }

}
