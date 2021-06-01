import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../../services/comment.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from '@blog-workspace/api-interfaces';

@Component({
  selector: 'blog-workspace-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  commentList: Comment[];

  constructor(private cs: CommentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCommentList();
  }

  loadCommentList() {
    this.cs.getComments(this.route.snapshot.params.id).subscribe(list => {
      this.commentList = list.list;
    });
  }

}
