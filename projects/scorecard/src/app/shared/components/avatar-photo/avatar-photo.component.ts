
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-photo',
  template: `
  <div class="circle" [ngStyle]="{'background-color':  circleColor }">
    <img *ngIf="!showInitials" src="{{ photoUrl }}">

    <div *ngIf="showInitials" class="initials">
        {{ initials }}
    </div>
  </div>
  `,
  styles: [`
    .circle {
      border-radius   : 50%;
      width           : 60px;
      height          : 60px;
      display         : flex;
      justify-content : center;
      align-items     : center;

      img{
          border-radius: 50%;
          width        : 60px;
          height       : 60px;
      }

      .initials {
          color         : #FFFFFF;
          font-size     : 20px;
          line-height   : 19px;
          letter-spacing: 0.2625px;
      }
    }
  `]
})

export class AvatarPhotoComponent implements OnInit {

  @Input() photoUrl: string;
  @Input() name: string;

  showInitials = false;
  initials: string;
  circleColor: string;

  colors = [
      '#EB7181', // red
      '#468547', // green
      '#FFD558', // yellow
      '#3670B2', // blue
  ];

  ngOnInit() {

    if (!this.photoUrl) {
        this.showInitials = true;
        this.createInititals();

        const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
        this.circleColor = this.colors[randomIndex];
    }

  }

  private createInititals(): void {
    let initials = "";

    for (let i = 0; i < this.name.length; i++) {
        if (this.name.charAt(i) === ' ') {
            continue;
        }

        if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
            initials += this.name.charAt(i);

            if (initials.length == 2) {
                break;
            }
        }
    }

    this.initials = initials;
  }
}
