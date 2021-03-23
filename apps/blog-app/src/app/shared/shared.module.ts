import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogSidebarComponent } from './components/blog-sidebar/blog-sidebar.component';
import { BlogDetailViewComponent } from './components/blog-detail-view/blog-detail-view.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BlogComponent,
    BlogListComponent,
    BlogSidebarComponent,
    BlogDetailViewComponent,
    CreateCommentComponent,
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BlogComponent,
    BlogListComponent,
    BlogDetailViewComponent,
    CreateCommentComponent,
    CommentComponent,
    CommentListComponent
  ]
})
export class SharedModule { }
