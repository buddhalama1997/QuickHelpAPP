import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {
map: mapboxgl.Map;
constructor() { }

ngOnInit(){
mapboxgl.accessToken = environment.mapbox.accessToken;
this.map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [85.3063035,27.7059412], // starting position
zoom: 16.6 // starting zoom
});
this.createMarker(85.3063035,27.7059412);
this.map.addControl(new mapboxgl.NavigationControl());
}

createMarker(lng: number, lat: number){
  const marker = new mapboxgl.Marker({
    draggable: false
    })
    .setLngLat([lng,lat])
    .addTo(this.map);
}
}
