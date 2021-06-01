import { BlogListService } from './../../services/blog-list.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from '@blog-workspace/api-interfaces';

@Component({
  selector: 'blog-workspace-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  tags: string[] = [];
  categories: { name: string, numberOfBlogs: number }[] = [];
  blogs: Blog[] = [];
  totalNumberOfBlogs = 0;
  blogsPerPage = 10;

  constructor(private blogListService: BlogListService) { }

  ngOnInit(): void {
    this.blogListService.getListOfTags().subscribe(v => { console.log(v); this.tags = v.tags;});
    this.blogListService.getListOfCategories().subscribe(v => this.categories = v.categories);
    this.blogListService.getBlogs().subscribe(v => {
      this.totalNumberOfBlogs = v.total;
      this.blogs = v.list
    });
  }

  changeOfPage(pageNumber: number) {
    this.blogListService.getBlogs((pageNumber * this.blogsPerPage) - this.blogsPerPage).subscribe(v => {
        this.blogs = v.list
      }
    );
  }
}

