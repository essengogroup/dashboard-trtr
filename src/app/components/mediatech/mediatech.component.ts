import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-mediatech',
  templateUrl: './mediatech.component.html',
  styleUrls: ['./mediatech.component.scss']
})
export class MediatechComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private matDialRef:MatDialogRef<MediatechComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.matDialRef.close()
  }
}
