import { BlogService } from '../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '@blog-workspace/api-interfaces';

@Component({
  selector: 'blog-workspace-blog-detail-view',
  templateUrl: './blog-detail-view.component.html',
  styleUrls: ['./blog-detail-view.component.scss']
})
export class BlogDetailViewComponent implements OnInit {
  readonly blogId: string;
  blog: Blog;

  constructor(private route: ActivatedRoute, private bs: BlogService) {
    this.blogId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.bs.getBlogById(this.blogId).subscribe(loadedBlog => {
      this.blog = loadedBlog;
    });
  }

  get blogTags(): string[] {
    return this.blog?.tags;
  }

}
