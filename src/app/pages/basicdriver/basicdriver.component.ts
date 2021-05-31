import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {BasicdriverService} from './basicdriver.service'
import { basicdriver } from './basicdriver';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-basicdriver',
  templateUrl: './basicdriver.component.html',
  styleUrls: ['./basicdriver.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BasicdriverComponent implements OnInit {
  basicdrivers: basicdriver[];
  selectedbasicdrivers: basicdriver[];
  uploadedFiles: any[] = [];
  Dialog: boolean;
  basic: basicdriver;
  submitted: boolean;
  statuses: any[];
  constructor(private breadcrumbService: AppBreadcrumbService,private basicdriver: BasicdriverService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'basicdriver', routerLink: ['/home/basicdriver'] }
  ]);

  this.basicdriver.getbasicdriver().then(data => this.basicdrivers = data);
  this.statuses = [
    {label: 'Car', value: '1'},
    {label: 'motorcycle', value: '2'},
];
  }

  openNew() {
    this.basic = {};
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

savebasic() {
  if(this.basic.id_basic_driver){
    this.submitted = true;
    let formData = new FormData();
    if(this.basic.description == '' || this.basic.type_car == null  ){
      return false
    } 
    if(typeof this.basic.description == 'undefined' ||typeof this.basic.type_car == 'undefined'  ){
      return false
    }
  formData.append('description', this.basic.description);
  formData.append('type_car', `${this.basic.type_car}`);
  formData.append('id_basic_driver', `${this.basic.id_basic_driver}`);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
   for (let i = 0; i < this.uploadedFiles.length; i++) {
       formData.append(`${i}`, this.uploadedFiles[i])
    }

    this.basicdriver.updatebasicdriver(formData).then(data =>{
        if(data?.code == 200){
          this.basicdriver.getbasicdriver().then(data =>  this.basicdrivers = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
          this.uploadedFiles= [];
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
    
  }else{
   
  this.submitted = true;
  if(this.basic.description == ''){
    return false
  } 
  if(typeof this.basic.description == 'undefined' ||typeof this.basic.type_car == 'undefined'  ){
    return false
  }
  let formData = new FormData();
  formData.append('description', this.basic.description);
  formData.append('type_car', `${this.basic.type_car}`);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
 for (let i = 0; i < this.uploadedFiles.length; i++) {
     formData.append(`${i}`, this.uploadedFiles[i])
  }
  this.basicdriver.insertbasicdriver(formData).then(data =>{
      if(data?.code == 200){
        this.basicdriver.getbasicdriver().then(data =>  this.basicdrivers = data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
        this.uploadedFiles= [];
        this.basic = {};
        this.Dialog = false;
      }else{
        this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
      }
  })
}
}

async editbasicdriver( basic: basicdriver) {
  this.uploadedFiles= [];
  const datastatus=this.statuses.filter(val => val.value === `${basic.type_car}`);
  let datafile =await this.dataURItoBlob(basic.image)
  let type =datafile.type.split('/')[1]
  let imageFile = new File([datafile], `Edit-1.${type}`, { type: datafile.type });
  this.uploadedFiles.push(imageFile)
  if(datastatus.length>0){
    basic.type_car=datastatus['0']['value']
  }
  console.log(basic)
  this.basic = {...basic};
    this.Dialog = true;
}

deletebasicdriver( basic: basicdriver) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + basic.id_basic_driver + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let datajson={
          id_basic_driver:basic.id_basic_driver
        }
        this.basicdriver.deletebasicdriver(datajson)
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
          this.basicdriver.getbasicdriver().then(data =>  this.basicdrivers = data);
      }
  });
}

deleteSelectedbasicdriver() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.basicdrivers = this.basicdrivers.filter(val => !this.selectedbasicdrivers.includes(val));
          this.selectedbasicdrivers = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
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
