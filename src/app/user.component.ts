import {Component,OnInit } from  '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import {user} from './user';
import {Routes, RouterModule} from '@angular/router';
import {UserService } from './service/user.service';

@Component({
  moduleId: module.id,
    selector:'login',
    templateUrl:'/user.component.html',  
  providers:[
    UserService
  ]
})
export class UserComponent implements OnInit {
router: Router;
loading=false;
 public ngForm: FormGroup; 
  private users:user[]=[];
  private id:number;
  private name:string;
  private password:string;
  private cond:boolean=true;
  private loginname:string;
  constructor(_router: Router,private userservice:UserService){
  this.router=_router;
    this.userservice.getPosts().subscribe(users => {
      this.users = users;
    }
    );
  }
 ngOnInit() {
      this.userservice.getPosts().subscribe(users => {
      this.users = users;
    });return true;}
    
  submitForm(value:any){
 this.loading=true; 
      this.userservice.getPosts().subscribe(users => {
      this.users = users;
    });
  
      for(let user of this.users)
  {
    if(user.name==value.name && user.password==value.password){       
      this.loginname=value.name;  localStorage.setItem('currentuser',value.name);
     
    }
  }
  if(!this.loginname){ alert('UserName & Password is Wrong'); this.loading=false;} else{ window.location.reload(true);
    this.router.navigateByUrl('/fizzbuzz');}
}
search(id:number){
 
  for(let user of this.users)
  {
    if(user.id==id)
    alert(JSON.stringify(user));
  }
  return true;
}
updateUser(value:any){
  //alert(JSON.stringify("Updated"));
  this.id=value.id;
  this.name=value.name;
  this.password=value.password;
  this.cond=false;
  
 return true;
}


    removeUser(value:any){  
      var index:number =this.users.indexOf(value);
       this.users.splice(index,1);
       this.userservice.removeUser(value.id)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
            this.users.splice(index, 0, value);
          });return true;}}

