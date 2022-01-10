import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ISite} from "../../../models/site";

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit {
  editSiteForm!:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:ISite,
    private formBuilder:FormBuilder,
    private matDialRef:MatDialogRef<EditSiteComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.editSiteForm=this.formBuilder.group({
      name:new FormControl(this.data.name,Validators.required),
      consign:new FormControl(this.data.consign,Validators.required),
      avantages:new FormControl(this.data.avantages.toString(),Validators.required),
      description:new FormControl(this.data.description,Validators.required),
      galery:new FormControl(this.data.galery.toString(),Validators.required),
      price:new FormControl(this.data.price,Validators.required),
      image:new FormControl(this.data.image,Validators.required)
    })
  }

  onCancel(){
    this.matDialRef.close();
  }

  onSubmit(){
    let dataForm = this.editSiteForm.value

    const iSite={
      id:this.data.id,
      name:dataForm.name,
      consign:dataForm.consign,
      departement:this.data.name,
      departement_id:this.data.id,
      avantages:dataForm.avantages.split(','),
      description:dataForm.description,
      galery:dataForm.galery.split(','),
      price:dataForm.price,
      visite:this.data.visite,
      stars:this.data.stars,
      image:dataForm.image
    }

    this.matDialRef.close(iSite);
  }

}
