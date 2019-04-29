import { Component, OnInit } from '@angular/core';
import { ReqresService } from '../../reqres.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Object;
 
  constructor(private reqres: ReqresService, private route: ActivatedRoute, private router: Router) {
    route.queryParams.subscribe(_ => { 
      this.getUsers();
  }); 
   }

ngOnInit() {
  
}

getUsers() {
  this.reqres.getUsers(this.route.snapshot.queryParams['page']).subscribe(data => {
    this.users = data
  });
}

delete(id) {
  this.reqres.deleteSingleUser(id)
    .subscribe(_ => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
    );
}

nextPage() {
  if (this.users['page'] < this.users['total_pages']) {
    this.router.navigate(['/users'], { queryParams: { page: this.users['page'] + 1 }});
  }
}

previousPage() {
  this.router.navigate(['/users'], { queryParams: { page: this.users['page'] - 1 } });
}

}
