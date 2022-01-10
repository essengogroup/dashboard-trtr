import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDepartement} from "../../../models/departement";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  editForm! :FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:IDepartement,
    private formBuilder:FormBuilder,
    private matDialRef:MatDialogRef<EditDepartmentComponent>
    ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.editForm=this.formBuilder.group({
      name:new FormControl(this.data.name,Validators.required),
      image:new FormControl(this.data.image,Validators.required),
    })
  }

  onSubmit(){
    let editFormValue= this.editForm.value

    this.data.name=editFormValue.name
    this.data.image=editFormValue.image

    this.matDialRef.close(this.data)
  }

  onCancel(){
    this.matDialRef.close()
  }

}
