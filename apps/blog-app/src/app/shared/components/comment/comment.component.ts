import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '@blog-workspace/api-interfaces';

@Component({
  selector: 'blog-workspace-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
  }

  get commentCreated() {
    let dateString = ''
    Object.keys(this.comment.date).forEach(key => {
      if (this.comment.date[key] !== 0 && dateString === '') {
        dateString += `${this.comment.date[key]} ${key} ago`;
      }
    });
    
    if (dateString === '') {
      dateString = 'just now';
    }
    
    return dateString;
  }

}
