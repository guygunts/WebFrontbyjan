import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {questionService} from './question.service'
import { question } from './question';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class QuestionComponent implements OnInit {
  questions: question[];
  selectedquestions: question[];
  Dialog: boolean;
  questiondata: question;
  submitted: boolean;
  statuses: any[];
  constructor(private breadcrumbService: AppBreadcrumbService,private question: questionService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'question', routerLink: ['/home/question'] }
  ]);

  this.question.getquestion().then(data => this.questions = data);

  }

  
  openNew() {
    this.questiondata = {};
    this.submitted = false;
    this.Dialog = true;
  }

  hideDialog() {
    this.Dialog = false;
    this.submitted = false;
  }

  savequestion() {
    this.questiondata.CREATE_BY= sessionStorage.getItem('user')
    if(this.questiondata.id_question){
      this.submitted = true;
      if(this.questiondata.question == '' ||this.questiondata.answer == '' ){
        return false
      } 
      if(typeof this.questiondata.question == 'undefined' ||typeof this.questiondata.answer == 'undefined'){
        return false
      }

      this.question.updatequestion(this.questiondata).then(data =>{
          if(data?.code == 200){
            this.question.getquestion().then(data =>  this.questions = data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'questiondata Updated', life: 3000});
            this.Dialog = false;
          }else{
            this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
          }
      })
      
    }else{
     
    this.submitted = true;
    if(this.questiondata.question == '' ||this.questiondata.answer == '' ){
      return false
    } 
    if(typeof this.questiondata.question == 'undefined' ||typeof this.questiondata.answer == 'undefined'){
      return false
    }

    this.question.insertquestion(this.questiondata).then(data =>{
        if(data?.code == 200){
          this.question.getquestion().then(data =>  this.questions = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'questiondata Updated', life: 3000});
          this.questiondata = {};
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
  }
  }

  async editquestion( data: question) {
    this.submitted=false
    this.questiondata = {...data};
      this.Dialog = true;
  }

  deletequestion( basic: question) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + basic.id_question + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.question.deletequestion(basic)
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
            this.question.getquestion().then(data =>  this.questions = data);
        }
    });
  }
}
