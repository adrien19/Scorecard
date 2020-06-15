import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommentObject } from './comment-item/comment-item.component';
import { AuthenticationService } from '../../../layouts/auth/auth-services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-commenting',
  templateUrl: './commenting.component.html',
  styleUrls: ['./commenting.component.scss']
})

export class CommentingComponent implements OnInit {

  currUser: User;
  commentObjects: CommentObject[];
  showMoreComments = false;
  // numberOfComments = 0;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.currUser = this.authenticationService.userValue;
    this.commentObjects = new Array<CommentObject>();
    if (this.commentObjects.length === 0) {
      this.showMoreComments = true;
    }else{
      this.showMoreComments = false;
    }
  }

  sendComment(comment: any){
    comment.message = comment.message.trim();
    if (comment.message.length > 0) {
      const newCommentObject = new CommentObject(
        this.currUser,
        new Date(),
        comment,
      );
      this.commentObjects.push(newCommentObject);
      this.showMoreComments = false;
    }
  }
}
