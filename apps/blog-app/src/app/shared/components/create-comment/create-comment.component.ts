import { CommentService } from './../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '@blog-workspace/api-interfaces';

@Component({
  selector: 'blog-workspace-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  createCommentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CommentService) {
    this.createForm();
  }

  ngOnInit(): void {
    
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

    this.cs.createComment(newComment).subscribe(() => {
      this.createCommentForm.reset();
      this.cs.newCommentAddedEvent();
    });
  }

}
