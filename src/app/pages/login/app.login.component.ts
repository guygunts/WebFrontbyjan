import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {LoginService} from './app.login.service'
import { RouterModule, Router } from '@angular/router';
import { ConfirmationService,MessageService} from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  providers: [ConfirmationService,MessageService]
})

export class AppLoginComponent {
  productDialog: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: boolean;
  value3: string;
  user = sessionStorage.getItem('user')
  constructor(private formBuilder: FormBuilder,private login:LoginService,private router: Router,private service :MessageService) {
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.registerForm = this.formBuilder.group({
      USER_NAME: new FormControl(null, [Validators.required]),
      PASSWORD: new FormControl(null, [Validators.required]),
      TEL:new FormControl(null),
      Address :new FormControl(null)
    });
  }
  
  openNew() {
    this.registerForm.reset()
    this.productDialog = true;
    this.submitted = false;
}
reset(){
  this.registerForm.reset()
}
  async onSubmit() {
    
    await this.login.login(this.loginForm.value).then((datajson)=>{
      if(datajson['code'] == 200){
        sessionStorage.setItem('user', datajson['user'])
        sessionStorage.setItem('role', datajson['role'])
          this.user = sessionStorage.getItem('user')
        this.router.navigate(['/home/basicdriver']);
      }else{
        this.service.add({key: 'tst',severity: 'error', summary: 'wrong', detail: datajson['msg']});
      }
    }).catch(()=>{
      this.service.add({key: 'tst',severity: 'error', summary: 'wrong', detail: 'something wrong'});
    });
  }

  async register(){
    await this.login.register(this.registerForm.value).then((datajson)=>{
      if(datajson['code'] == 200){
        this.productDialog = false;
        this.service.add({key: 'tst',severity:'success', summary: 'Successful', detail: 'register Successful', life: 3000});
      }else{
        this.service.add({key: 'tst',severity: 'error', summary: 'wrong', detail: datajson['msg']});
      }
    }).catch(()=>{
      this.service.add({key: 'tst',severity: 'error', summary: 'wrong', detail: 'something wrong'});
    });
  }
}
