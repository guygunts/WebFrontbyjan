import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {technicalService} from './technical.service'
import { technical } from './technical';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TechnicalComponent implements OnInit {
  technicals: technical[];
  selectedtechnicals: technical[];
  uploadedFiles: any[] = [];
  Dialog: boolean;
  technicaldata: technical;
  submitted: boolean;

  constructor(private breadcrumbService: AppBreadcrumbService,private technical: technicalService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'technical', routerLink: ['/home/technical'] }
  ]);
  this.technical.gettechnical().then(data => this.technicals = data);
  }

  openNew() {
    this.technicaldata = {};
    this.submitted = false;
    this.Dialog = true;
    this.uploadedFiles= [];
}

clear(){
  this.uploadedFiles= [];
}

cancel(event){
  for( let i = 0; i < this.uploadedFiles.length; i++){ 
  
    if ( this.uploadedFiles[i].name === event.file.name) { 

      this.uploadedFiles.splice(i, 1); 
    }

}
}

hideDialog() {
  this.Dialog = false;
  this.submitted = false;
}

onUpload(event) {
    
  if(this.uploadedFiles.length >0){
    this.messageService.add({severity: 'error', summary: 'Uploaded', detail: 'already to uploaded'});
    return false
  }
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  
} 

savetechnical() {
  if(this.technicaldata.id_technical){
    this.submitted = true;
    let formData = new FormData();
    if(this.technicaldata.description == ''){
      return false
    } 
    if(typeof this.technicaldata.description == 'undefined' ){
      return false
    }
  formData.append('description', this.technicaldata.description);
  formData.append('id_technical', `${this.technicaldata.id_technical}`);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
   for (let i = 0; i < this.uploadedFiles.length; i++) {
       formData.append(`${i}`, this.uploadedFiles[i])
    }

    this.technical.updatetechnical(formData).then(data =>{
        if(data?.code == 200){
          this.technical.gettechnical().then(data =>  this.technicals = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
          this.uploadedFiles= [];
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
    
  }else{
   
  this.submitted = true;
  if(this.technicaldata.description == ''){
    return false
  } 
  if(typeof this.technicaldata.description == 'undefined' ){
    return false
  }
  let formData = new FormData();
  formData.append('description', this.technicaldata.description);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
 for (let i = 0; i < this.uploadedFiles.length; i++) {
     formData.append(`${i}`, this.uploadedFiles[i])
  }
  this.technical.inserttechnical(formData).then(data =>{
      if(data?.code == 200){
        this.technical.gettechnical().then(data =>  this.technicals = data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
        this.uploadedFiles= [];
        this.technicaldata = {};
        this.Dialog = false;
      }else{
        this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
      }
  })
}
}

async edittechnical( basic:technical ) {
  this.uploadedFiles= [];

  let datafile =await this.dataURItoBlob(basic.image)
  let type =datafile.type.split('/')[1]
  let imageFile = new File([datafile], `Edit-1.${type}`, { type: datafile.type });
  this.uploadedFiles.push(imageFile)

  this.technicaldata = {...basic};
    this.Dialog = true;
}

deletetechnical( basic: technical) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + basic.id_technical + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.technical.deletetechnical(basic)
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
          this.technical.gettechnical().then(data =>  this.technicals = data);
      }
  });
}


async dataURItoBlob(dataURI) {
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
for (var i = 0; i < binary.length; i++) {
   array.push(binary.charCodeAt(i));
}
  let datasplittype=dataURI.split(',')[0]
  let datasplittype1=datasplittype.split(';')[0]
  let datasplittype2=datasplittype1.split(':')[1]
return new Blob([new Uint8Array(array)], {
  type: datasplittype2
});
}
}
