import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, BlogComponent, BlogListComponent, BlogSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, BlogComponent, BlogListComponent, BlogSidebarComponent]
})
export class SharedModule { }
