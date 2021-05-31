import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {typedriverlicenseService} from './typedriverlicense.service'
import { typedriverlicense } from './typedriverlicense';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-typedriverlicense',
  templateUrl: './typedriverlicense.component.html',
  styleUrls: ['./typedriverlicense.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TypedriverlicenseComponent implements OnInit {
  typedriverlicenses: typedriverlicense[];
  selectedtypedriverlicenses: typedriverlicense[];
  Dialog: boolean;
  typedriverlicensedata: typedriverlicense;
  submitted: boolean;
  statuses: any[];

  constructor(private breadcrumbService: AppBreadcrumbService,private typedriverlicense: typedriverlicenseService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'typedriverlicense', routerLink: ['/home/typedriverlicense'] }
  ]);
  this.typedriverlicense.gettypedriverlicense().then(data => this.typedriverlicenses = data);
  }

  openNew() {
    this.typedriverlicensedata = {};
    this.submitted = false;
    this.Dialog = true;
  }

  hideDialog() {
    this.Dialog = false;
    this.submitted = false;
  }

  savetypedriverlicense() {
    this.typedriverlicensedata.CREATE_BY= sessionStorage.getItem('user')
    if(this.typedriverlicensedata.id_type_driver_license){
      this.submitted = true;
      if(this.typedriverlicensedata.description == ''){
        return false
      } 
      if(typeof this.typedriverlicensedata.description == 'undefined' ){
        return false
      }

      this.typedriverlicense.updatetypedriverlicense(this.typedriverlicensedata).then(data =>{
          if(data?.code == 200){
            this.typedriverlicense.gettypedriverlicense().then(data =>  this.typedriverlicenses = data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'typedriverlicensedata Updated', life: 3000});
            this.Dialog = false;
          }else{
            this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
          }
      })
      
    }else{
     
    this.submitted = true;
    if(this.typedriverlicensedata.description == ''){
      return false
    } 
    if(typeof this.typedriverlicensedata.description == 'undefined' ){
      return false
    }

    this.typedriverlicense.inserttypedriverlicense(this.typedriverlicensedata).then(data =>{
        if(data?.code == 200){
          this.typedriverlicense.gettypedriverlicense().then(data =>  this.typedriverlicenses = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'typedriverlicensedata Updated', life: 3000});
          this.typedriverlicensedata = {};
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
  }
  }

  async edittypedriverlicense( data: typedriverlicense) {
    this.typedriverlicensedata = {...data};
      this.Dialog = true;
  }

  deletetypedriverlicense( basic: typedriverlicense) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + basic.id_type_driver_license + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.typedriverlicense.deletetypedriverlicense(basic)
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
            this.typedriverlicense.gettypedriverlicense().then(data =>  this.typedriverlicenses = data);
        }
    });
  }
}
