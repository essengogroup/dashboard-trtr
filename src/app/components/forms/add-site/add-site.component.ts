import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDepartement} from "../../../models/departement";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "../../../models/fileUpload";
import {ISite} from "../../../models/site";
import {SiteService} from "../../../services/forms/site.service";

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss']
})
export class AddSiteComponent implements OnInit {
  siteForm!:FormGroup;

  selectedFiles?: FileList|undefined;
  currentFileUpload?: FileUpload;
  percentage?: number =0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:IDepartement,
    private formBuilder:FormBuilder,
    private matDialRef:MatDialogRef<AddSiteComponent>,
    private siteService:SiteService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.siteForm=this.formBuilder.group({
      name:new FormControl('',Validators.required),
      consign:new FormControl('',Validators.required),
      avantages:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      galery:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      image:new FormControl('',Validators.required)
    })
  }

  onCancel(){
    this.matDialRef.close();
  }

  onSubmit(){
    let dataForm = this.siteForm.value

    const iSite={
      name:dataForm.name,
      consign:dataForm.consign,
      departement:this.data.name,
      departement_id:this.data.id,
      avantages:dataForm.avantages.split(','),
      description:dataForm.description,
      galery:dataForm.galery.split(','),
      price:dataForm.price,
      visite:0,
      stars:0,
      image:dataForm.image
    }

    this.upload(iSite)
  }

  selectFile($event: any) {
    this.selectedFiles = $event.target.files;
  }

  upload(site:any) {
    let file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.siteService.uploadFileToStorage(this.currentFileUpload,site).subscribe({
      next:value => this.matDialRef.close(site),
      error:err => console.error(err)
    })
  }
}
