
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { IUserHolder } from '../../../models/scorecard-item';

@Component({
  selector: 'app-comment-item',
  template: `
    <div class="media d-flex h-100">
      <div class="media-left align-self-start mr-3">
        <a class="avatar avatar-online" href="javascript:void(0)">
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="...">
          <i></i>
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading m-0 mb-1 "> {{ commentObject.createdBy.userfullName }}
          <span>
            <small class="text-muted text-right mr-10"> {{ commentObject.timeOfCreation | dateAgo }} </small>
          </span>
        </h4>

        <app-message-item [message]="commentObject.messageWord"></app-message-item>

      </div>
    </div>
    <div class="media-footer">
      <button (click)="onLikeComment()" [ngClass]="likedByCurrent? 'likedByCurrentUser' : 'dislikedByCurrentUser' ">
       {{ commentObject.commentLikes}}Like
      </button>
    </div>
  `,
  styles: [`

    .avatar {
      position: relative;
      display: inline-block;
      width: 40px;
      white-space: nowrap;
      border-radius: 1000px;
      vertical-align: bottom

    }

    .avatar i {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      border-radius: 100%
    }

    .avatar img {
      width: 100%;
      max-width: 100%;
      height: auto;
      border: 0 none;
      border-radius: 1000px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }

    .avatar-online i {
      background-color: #4caf50
    }

    .avatar-off i {
      background-color: #616161
    }

    .avatar-busy i {
      background-color: #ff9800
    }

    .avatar-away i {
      background-color: #f44336
    }

    .avatar-100 {
      width: 100px
    }

    .avatar-100 i {
      height: 20px;
      width: 20px
    }

    .avatar-lg {
      width: 50px
    }

    .avatar-lg i {
      height: 12px;
      width: 12px
    }

    .avatar-sm {
      width: 30px
    }

    .avatar-sm i {
      height: 8px;
      width: 8px
    }

    .avatar-xs {
      width: 20px
    }

    .avatar-xs i {
      height: 7px;
      width: 7px
    }

    .media-footer{
      display: relative;
      width: 20px;
      height: 20px;
      margin-left: 50px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .likedByCurrentUser{
      background: blue;
      color: white;
    }
    .dislikedByCurrentUser {
      background: none;
      color: black;
    }

  `]
})

export class CommmentItemComponent implements OnInit {

  @Input() commentObject: CommentObject;
  @Input() currUser: User;
  likedByCurrent = false;

  constructor(
  ) { }

  ngOnInit() { }

  onLikeComment(){
    const userAlreadylikedComment = this.commentObject.commentLikedBy? this.commentObject.commentLikedBy.some(x => x.userId === this.currUser.userId) : false;
    if (userAlreadylikedComment) {
      this.commentObject.commentLikes = this.commentObject.commentLikes - 1;
      this.commentObject.commentLikedBy = this.commentObject.commentLikedBy.filter(x => { return x.userId !== this.currUser.userId });
      this.likedByCurrent = !this.likedByCurrent;
    } else{
      this.commentObject.commentLikes = this.commentObject.commentLikes + 1;
      if (this.commentObject.commentLikedBy) {
        this.commentObject.commentLikedBy.push(this.currUser);
        this.likedByCurrent = !this.likedByCurrent;
    }else{
        this.commentObject.commentLikedBy = [this.currUser];
        this.likedByCurrent = !this.likedByCurrent;
    }
    }
  }
}

export class CommentObject {
  constructor(
    public createdBy: User,
    public timeOfCreation: Date,
    public messageWord: { message: string, mentions: IUserHolder[] },
    public commentLikes = 0,
    public commentLikedBy?: User[],
  ){}
}
