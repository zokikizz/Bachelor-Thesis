import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  @Input() blogList = [
    {
      title: 'Benefits of Minimalism',
      category: 'House',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
        'Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes,' 
      + 'nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
    {
      title: '10 Books that I will recommend',
      category: 'Reading',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
        'Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes,' 
      + 'nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
    {
      title: 'Benefits of house plants',
      category: 'House',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
        'Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes,' 
      + 'nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
