import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IDepartement} from "../../../models/departement";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "../../../models/fileUpload";
import {DepartementService} from "../../../services/forms/departement.service";

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent implements OnInit {
  departmentForm!:FormGroup;

  selectedFiles?: FileList|undefined;
  currentFileUpload?: FileUpload;
  percentage?: number =0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:IDepartement,
    private formBuilder:FormBuilder,
    private matDialRef:MatDialogRef<AddDepartementComponent>,
    private departmentService: DepartementService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.departmentForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      image:new FormControl('',Validators.required),
    })
  }


  onCancel() {
    this.matDialRef.close();
  }

  onSubmit() {
    const departmentFormValue = this.departmentForm.value
    this.upload(departmentFormValue)
  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
  }

  upload(departement:IDepartement) {
    let file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.departmentService.uploadFileToStorage(this.currentFileUpload,departement).subscribe({
      next:value => this.matDialRef.close(departement),
      error:err => console.error(err)
    })
  }
}
