import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {examService} from './exam.service'
import { exam } from './exam';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {trigger, state, style, transition, animate} from '@angular/animations';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [ConfirmationService, MessageService],
  styles: [`
  .box {
      background-color: var(--surface-e);
      text-align: center;
      padding: 1.25rem;
      font-size: 1.5rem;
      border-radius: 4px;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  }

  .box-stretched {
      height: 100%;
  }

  .vertical-container {
      margin: 0;
      height: 200px;
      background: var(--surface-d);
      border-radius: 4px;
  }

  .nested-grid .p-col-4 {
      padding-bottom: 1rem;
  }
`],
animations: [
  trigger('animation', [
      state('visible', style({
          transform: 'translateX(0)',
          opacity: 1
      })),
      transition('void => *', [
          style({transform: 'translateX(50%)', opacity: 0}),
          animate('300ms ease-out')
      ]),
      transition('* => void', [
          animate(('250ms ease-in'), style({
              height: 0,
              opacity: 0,
              transform: 'translateX(50%)'
          }))
      ])
  ])
]
})
export class ExamComponent implements OnInit {
  exams: exam[];
  selectedexams: exam[];
  Dialog: boolean;
  examdata: exam;
  submitted: boolean;
  statuses: any[];
  columns: any[];
  constructor(private breadcrumbService: AppBreadcrumbService,private exam: examService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'exam', routerLink: ['/home/exam'] }
  ]);
  this.columns = [];
  this.exam.getexam().then(data => this.exams = data)

  }

  openNew() {
    this.examdata = {};
    this.columns=[]
    this.submitted = false;
    this.Dialog = true;
  }

  hideDialog() {
    this.Dialog = false;
    this.submitted = false;
  }

   addColumn() {
        this.columns.push( {label: this.examdata.exam_choice, value: this.examdata.exam_choice},)
    }

    removeColumn() {
         this.columns.splice(-1, 1);
    }

    saveexam() {
      this.examdata.CREATE_BY= sessionStorage.getItem('user')
      if(this.examdata.id_exam){
        this.submitted = true;
        if(this.examdata.exam_name == ''){
          return false
        } 
        if(typeof this.examdata.exam_name == 'undefined' ){
          return false
        }
  
        this.exam.updateexam(this.examdata).then(data =>{
            if(data?.code == 200){
              this.exam.getexam().then(data =>  this.exams = data);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'examdata Updated', life: 3000});
              this.Dialog = false;
            }else{
              this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
            }
        })
        
      }else{
       
      this.submitted = true;
      if(this.examdata.exam_name == ''){
        return false
      } 
      if(typeof this.examdata.exam_name == 'undefined' ){
        return false
      }
      this.examdata.exam_choice=this.columns
      this.exam.insertexam(this.examdata).then(data =>{
          if(data?.code == 200){
            this.exam.getexam().then(data =>  this.exams = data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'examdata Updated', life: 3000});
            this.examdata = {};
            this.Dialog = false;
          }else{
            this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
          }
      })
    }
    }

    async editexam( data: exam) {
      this.examdata = {...data};
      this.columns=[]
      // const arr3 = this.columns.concat(this.examdata.exam_choice)
      for(const[key,value] of Object.entries(this.examdata.exam_choice)){
        this.columns.push(value)
      }
        this.Dialog = true;
    }
  
    deleteexam( basic: exam) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + basic.id_exam + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.exam.deleteexam(basic)
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
              this.exam.getexam().then(data =>  this.exams = data);
          }
      });
    }
  
}