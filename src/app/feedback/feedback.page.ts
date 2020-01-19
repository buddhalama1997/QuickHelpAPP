import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { Feedback } from '../service/feedback';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedback: Feedback = {
    Email:"",
    Suggestion:""
  };
  feedId = null;
  constructor(private service: AppServiceService, private toast: ToastController, private route: ActivatedRoute, private loadingController: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.feedId = this.route.snapshot.params['id'];
    if (this.feedId)  {
      this.loadfeed();
    }
  }
  async loadfeed() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.service.getFeedback(this.feedId).subscribe(res => {
      loading.dismiss();
      this.feedback = res;
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Thank you for your suggestion.',
      duration: 2000
    });
    toast.present();
  }

  async savefeedback() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.feedId) {
      this.service.updatefeedback(this.feedback, this.feedId).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    } else {
      this.service.postFeedback(this.feedback).then(() => {
        loading.dismiss();
        this.presentToast();
        this.nav.back();
      });
    }
  }
}
