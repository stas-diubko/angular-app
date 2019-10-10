import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailsService } from '../shared/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AboutBookComponent implements OnInit {
  public book:object = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private detailsService: DetailsService,

  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.detailsService.getBook(`books/${params.id}`).subscribe((data:any)=>{
        this.book = data.data
      })
    });
  }

}
