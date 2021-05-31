import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {penaltysService} from './penalty.service'
import { penaltys } from './penaltys';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PenaltyComponent implements OnInit {
  penaltys: penaltys[];
  selectedpenaltys: penaltys[];
  Dialog: boolean;
  penaltydata: penaltys;
  submitted: boolean;
  statuses: any[];
  constructor(private breadcrumbService: AppBreadcrumbService,private penalty: penaltysService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'penalty', routerLink: ['/home/penalty'] }
  ]);

  this.penalty.getpenaltys().then(data => this.penaltys = data);

  }

  openNew() {
    this.penaltydata = {};
    this.submitted = false;
    this.Dialog = true;
  }

  hideDialog() {
    this.Dialog = false;
    this.submitted = false;
  }
  

  savepenalty() {
    this.penaltydata.CREATE_BY= sessionStorage.getItem('user')
    if(this.penaltydata.id_penalty){
      this.submitted = true;
      if(this.penaltydata.description == ''){
        return false
      } 
      if(typeof this.penaltydata.description == 'undefined' ){
        return false
      }

      this.penalty.updatepenaltys(this.penaltydata).then(data =>{
          if(data?.code == 200){
            this.penalty.getpenaltys().then(data =>  this.penaltys = data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'penaltydata Updated', life: 3000});
            this.Dialog = false;
          }else{
            this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
          }
      })
      
    }else{
     
    this.submitted = true;
    if(this.penaltydata.description == ''){
      return false
    } 
    if(typeof this.penaltydata.description == 'undefined' ){
      return false
    }

    this.penalty.insertpenaltys(this.penaltydata).then(data =>{
        if(data?.code == 200){
          this.penalty.getpenaltys().then(data =>  this.penaltys = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'penaltydata Updated', life: 3000});
          this.penaltydata = {};
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
  }
  }

  async editpenalty( data: penaltys) {
    this.penaltydata = {...data};
      this.Dialog = true;
  }

  deletepenalty( basic: penaltys) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + basic.id_penalty + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.penalty.deletepenaltys(basic)
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
            this.penalty.getpenaltys().then(data =>  this.penaltys = data);
        }
    });
  }
}
