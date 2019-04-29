import { Component, OnInit } from '@angular/core';
import { ReqresService } from "../../reqres.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss']
})
export class UserSingleComponent implements OnInit {

  user:any;

  constructor(public reqres:ReqresService, private route: ActivatedRoute, private router: Router, private _location: Location) { }

  backClicked() {
    this._location.back();
  }


  ngOnInit() {
    this.reqres.getSingleUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.user = data;
    });
  }

}
