import { Blog } from '@blog-workspace/api-interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'blog-workspace-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

}
