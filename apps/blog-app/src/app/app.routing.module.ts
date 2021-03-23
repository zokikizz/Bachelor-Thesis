import { BlogDetailViewComponent } from './shared/components/blog-detail-view/blog-detail-view.component';
import { BlogListComponent } from './shared/components/blog-list/blog-list.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
  {
    path: '', component: BlogListComponent,
  },
  {
    path: 'blog/:id',
    component: BlogDetailViewComponent
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
