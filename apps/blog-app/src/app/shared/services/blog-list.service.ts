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
    return this.http.get < { tags: string[] }>(`${this.url}/allTags`);
  }

  getListOfCategories(): Observable<{ categories: { name: string, numberOfBlogs: number } []} > {
    return this.http.get<{ categories: { name: string, numberOfBlogs: number } []}> (`${this.url}/allCategories`);
  }


  getBlogs(startFrom?): Observable<{ total: number, list: Blog[] }> {
    const url = `${this.url}/list${ startFrom ? `?startFrom=${startFrom}`: ``}`;
    console.log(url);
    return this.http.get<{ total: number, list: Blog[] }>(url);
  }
}
