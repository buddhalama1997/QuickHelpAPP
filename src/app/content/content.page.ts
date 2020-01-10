import { Component, OnInit } from '@angular/core';
import { CONTENT } from '../content-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  con;

  index = 0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = params.id;
      this.con = CONTENT[this.index];
    }, err => {});
  }
}
