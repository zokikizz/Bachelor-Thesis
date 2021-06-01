import { CommentService } from './../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '@blog-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'blog-workspace-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent {

  createCommentForm: FormGroup;
  newCommentAdded = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CommentService) {
    this.createForm();
  }

  createForm() {
    this.createCommentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      comment: ['', Validators.required],
    });
  }

  createComment() {
    const formData: { email: string, comment: string, name: string } = this.createCommentForm.value;
    const newComment: Comment = {
      ...formData,
      blogId: this.route.snapshot.params.id,
      isApproved: false,
      date: Date.now()
    };

    this.cs.createComment(newComment).pipe(
      tap(() => this.createCommentForm.reset()),
      tap(() => this.newCommentAdded = true),
      delay(2000),
      tap(() => this.newCommentAdded = false)
    ).subscribe();
  }

}
