import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InformationService} from './infomation.service'
import { Product } from './product';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class InfomationComponent implements OnInit {
  
  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  statuses: any[];

  uploadedFiles: any[] = [];

  base64textString

  role

  constructor(private breadcrumbService: AppBreadcrumbService,private productService: InformationService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role')
    this.breadcrumbService.setItems([
        { label: 'Information', routerLink: ['/home/information'] }
    ]);
      this.productService.getProducts().then(data =>  this.products = data);
      this.statuses = [
          {label: 'ธรรมชาติและอุทยาน', value: '1'},
          {label: 'สถานที่สำคัญ', value: '2'},
          {label: 'ตลาด', value: '3'},
          {label: 'ที่พัก', value: '4'}
      ];
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.uploadedFiles= [];
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  async editProduct(product: Product) {
    this.uploadedFiles= [];
      const datastatus=this.statuses.filter(val => val.label === product.INFORMATION_TYPE);
      
      for(let i=0; i<product.image['length']; i++){
        let datafile =await this.dataURItoBlob(product.image[i].INFORMATION_IMAGE)
        let type =datafile.type.split('/')[1]
        let imageFile = new File([datafile], `Edit-${i}.${type}`, { type: datafile.type });
        this.uploadedFiles.push(imageFile)
      }
      if(datastatus.length>0){
      product.INFORMATION_TYPE=datastatus['0']['value']
    }
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.INFORMATION_TITLE + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            let datajson={
              ID_INFORMATION:product.ID_INFORMATION
            }
            this.productService.deleteinformation(datajson)
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              this.productService.getProducts().then(data =>  this.products = data);
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      if(this.product.ID_INFORMATION){
        this.submitted = true;
        let formData = new FormData();
        if(this.product.INFORMATION_TITLE == '' || this.product.INFORMATION_DESCRIPTION == '' ||this.product.INFORMATION_TYPE == '' ){
          return false
        } 
        if(typeof this.product.INFORMATION_TITLE == 'undefined' ||typeof this.product.INFORMATION_DESCRIPTION == 'undefined' ||typeof this.product.INFORMATION_TYPE == 'undefined' ){
          return false
        }
      formData.append('INFORMATION_DESCRIPTION', this.product.INFORMATION_DESCRIPTION);
      formData.append('INFORMATION_MAP', this.product.INFORMATION_MAP);
      formData.append('INFORMATION_TITLE', this.product.INFORMATION_TITLE);
      formData.append('INFORMATION_TYPE', this.product.INFORMATION_TYPE);
      formData.append('ID_INFORMATION', this.product.ID_INFORMATION);
       for (let i = 0; i < this.uploadedFiles.length; i++) {
           formData.append(`${i}`, this.uploadedFiles[i])
        }

        this.productService.updateinformation(formData).then(data =>{
            if(data?.code == 200){
              this.productService.getProducts().then(data =>  this.products = data);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
              this.uploadedFiles= [];
              this.productDialog = false;
            }else{
              this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
            }
        })
        
      }else{
       
      this.submitted = true;
      if(this.product.INFORMATION_TITLE == '' || this.product.INFORMATION_TITLE == '' ||this.product.INFORMATION_MAP == '' ){
        return false
      }
      if(typeof this.product.INFORMATION_TITLE == 'undefined' ||typeof this.product.INFORMATION_TITLE == 'undefined' ||typeof this.product.INFORMATION_MAP == 'undefined' ){
        return false
      }
      let formData = new FormData();
    formData.append('INFORMATION_DESCRIPTION', this.product.INFORMATION_DESCRIPTION);
    formData.append('INFORMATION_MAP', this.product.INFORMATION_MAP);
    formData.append('INFORMATION_TITLE', this.product.INFORMATION_TITLE);
    formData.append('INFORMATION_TYPE', this.product.INFORMATION_TYPE);
     for (let i = 0; i < this.uploadedFiles.length; i++) {
         formData.append(`${i}`, this.uploadedFiles[i])
      }
      this.productService.insertinformation(formData).then(data =>{
          if(data?.code == 200){
            this.productService.getProducts().then(data =>  this.products = data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            this.uploadedFiles= [];
            this.product = {};
            this.productDialog = false;
          }else{
            this.messageService.add({severity: 'error', summary: 'wrong', detail: 'something wrong'});
          }
      })
    }
  }

  clear(){
    this.uploadedFiles= [];
  }

  cancel(event){
    console.log(event.file)
    for( let i = 0; i < this.uploadedFiles.length; i++){ 
    
      if ( this.uploadedFiles[i].name === event.file.name) { 
  
        this.uploadedFiles.splice(i, 1); 
      }
  
  }
  }
 
 async onUpload(event) {
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    
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
