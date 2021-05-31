import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import {propertyService} from './property.service'
import { property } from './property';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PropertyComponent implements OnInit {
  propertys: property[];
  selectedpropertys: property[];
  uploadedFiles: any[] = [];
  Dialog: boolean;
  propertydata: property;
  submitted: boolean;

  constructor(private breadcrumbService: AppBreadcrumbService,private property: propertyService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'property', routerLink: ['/home/property'] }
  ]);
  this.property.getproperty().then(data => this.propertys = data);
  }


  openNew() {
    this.propertydata = {};
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
  if(this.propertydata.id_property){
    this.submitted = true;
    let formData = new FormData();
    if(this.propertydata.description == ''){
      return false
    } 
    if(typeof this.propertydata.description == 'undefined' ){
      return false
    }
  formData.append('description', this.propertydata.description);
  formData.append('id_property', `${this.propertydata.id_property}`);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
   for (let i = 0; i < this.uploadedFiles.length; i++) {
       formData.append(`${i}`, this.uploadedFiles[i])
    }

    this.property.updateproperty(formData).then(data =>{
        if(data?.code == 200){
          this.property.getproperty().then(data =>  this.propertys = data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
          this.uploadedFiles= [];
          this.Dialog = false;
        }else{
          this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
        }
    })
    
  }else{
   
  this.submitted = true;
  if(this.propertydata.description == ''){
    return false
  } 
  if(typeof this.propertydata.description == 'undefined' ){
    return false
  }
  let formData = new FormData();
  formData.append('description', this.propertydata.description);
  formData.append('CREATE_BY', sessionStorage.getItem('user'));
 for (let i = 0; i < this.uploadedFiles.length; i++) {
     formData.append(`${i}`, this.uploadedFiles[i])
  }
  this.property.insertproperty(formData).then(data =>{
      if(data?.code == 200){
        this.property.getproperty().then(data =>  this.propertys = data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'basic Updated', life: 3000});
        this.uploadedFiles= [];
        this.propertydata = {};
        this.Dialog = false;
      }else{
        this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
      }
  })
}
}

async editproperty( basic:property ) {
  this.uploadedFiles= [];

  let datafile =await this.dataURItoBlob(basic.image)
  let type =datafile.type.split('/')[1]
  let imageFile = new File([datafile], `Edit-1.${type}`, { type: datafile.type });
  this.uploadedFiles.push(imageFile)

  this.propertydata = {...basic};
    this.Dialog = true;
}

deleteproperty( basic: property) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + basic.id_property + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.property.deleteproperty(basic)
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Deleted', life: 3000});
          this.property.getproperty().then(data =>  this.propertys = data);
      }
  });
}

// deleteSelectedproperty() {
//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete the selected?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//           this.propertys = this.propertys.filter(val => !this.selectedpropertys.includes(val));
//           this.selectedpropertys = null;
//           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
//       }
//   });
// }


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

