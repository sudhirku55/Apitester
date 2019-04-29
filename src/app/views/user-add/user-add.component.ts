import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReqresService } from '../../reqres.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['../../app.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  name:string='';
  job:string='';
  id:number=null;
  createdAt:Date=null;
  isLoadingResults = false;
  success = false;
  submitted = false;
  newUser: Object;

  constructor(private router: Router, private reqres: ReqresService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'job' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.submitted = true;

    if(this.userForm.invalid) {
      return;
    }
    this.isLoadingResults = true;

    this.reqres.addSingleUser(form)
      .subscribe(res => {
          this.newUser = res;
          this.id = res['id'];
          this.createdAt = res['createdAt'];
          this.isLoadingResults = false;
          this.success = true;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    
  }

}
