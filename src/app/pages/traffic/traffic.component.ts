import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {trafficService} from './traffic.service'
import { traffic } from './traffic';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TrafficComponent implements OnInit {
  traffics: traffic[];
  selectedtraffics: traffic[];
  uploadedFiles: any[] = [];
  Dialog: boolean;
  trafficdata: traffic;
  submitted: boolean;
  constructor(private breadcrumbService: AppBreadcrumbService,private traffic: trafficService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'traffic', routerLink: ['/home/traffic'] }
  ]);
  this.traffic.gettraffic().then(data => this.traffics = data);
  }

  
  openNew() {
    this.trafficdata = {};
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

savetraffic() {
  if(this.trafficdata.id_traffic){
    this.submitted = true;
    let formData = new FormData();
    if(this.trafficdata.description == ''){
      return false
    } 
    if(typeof this.trafficdata.description == 'undefined' ){
      return false
    }
  formData.append('description', this.trafficdata.description);
  formData.append('id_traffic', `${this.trafficdata.id_traffic}`);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
   for (let i = 0; i < this.uploadedFiles.length; i++) {
       formData.append(`${i}`, this.uploadedFiles[i])
    }

    this.traffic.updatetraffic(formData).then(data =>{
        if(data?.code == 200){
          this.traffic.gettraffic().then(data =>  this.traffics = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
          this.uploadedFiles= [];
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
    
  }else{
   
  this.submitted = true;
  if(this.trafficdata.description == ''){
    return false
  } 
  if(typeof this.trafficdata.description == 'undefined' ){
    return false
  }
  let formData = new FormData();
  formData.append('description', this.trafficdata.description);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
 for (let i = 0; i < this.uploadedFiles.length; i++) {
     formData.append(`${i}`, this.uploadedFiles[i])
  }
  this.traffic.inserttraffic(formData).then(data =>{
      if(data?.code == 200){
        this.traffic.gettraffic().then(data =>  this.traffics = data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
        this.uploadedFiles= [];
        this.trafficdata = {};
        this.Dialog = false;
      }else{
        this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
      }
  })
}
}

async edittraffic( basic:traffic ) {
  this.uploadedFiles= [];

  let datafile =await this.dataURItoBlob(basic.image)
  let type =datafile.type.split('/')[1]
  let imageFile = new File([datafile], `Edit-1.${type}`, { type: datafile.type });
  this.uploadedFiles.push(imageFile)

  this.trafficdata = {...basic};
    this.Dialog = true;
}

deletetraffic( basic: traffic) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + basic.id_traffic + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.traffic.deletetraffic(basic)
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
          this.traffic.gettraffic().then(data =>  this.traffics = data);
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
