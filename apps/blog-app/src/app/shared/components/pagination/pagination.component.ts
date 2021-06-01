import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blog-workspace-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() totalNumberOfBlogs = 0;
  @Output() changePage = new EventEmitter<number>();
  currentPage = 1;

  get totalNumberOfPages(): number[] {
    return Array(Math.ceil(this.totalNumberOfBlogs / 10)).fill(1).reduce((acc, curr, index) => {
      acc.push(index+1);
      return acc;
    }, []);
  }

  skipToBeginning() {
    this.goToPage(1);
  }

  skipToEnd() {
    this.goToPage(Math.ceil(this.totalNumberOfBlogs / 10));
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changePage.emit(this.currentPage);
  }

}
