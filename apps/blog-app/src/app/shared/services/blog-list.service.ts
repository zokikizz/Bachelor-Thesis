import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '@blog-workspace/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  readonly url = 'http://localhost:3333/api/blog'

  constructor(private http: HttpClient) { }

  getListOfTags(): Observable< { tags: string[]} > {
    return this.http.get < { tags: string[] }>(`${this.url}/tags`);
  }

  getListOfCategories(): Observable<{ categories: { name: string, numberOfBlogs: number } []} > {
    return this.http.get<{ categories: { name: string, numberOfBlogs: number } []}> (`${this.url}/categories`);
  }


  getBlogs(): Observable<{ total: number, list: Blog[] }> {
    return this.http.get<{ total: number, list: Blog[] }>(`${this.url}/list`);
  }
}
