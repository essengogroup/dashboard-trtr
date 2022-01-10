import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMediatech} from "../../models/mediatech";
import {MediatechService} from "../../services/mediatech.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IDepartement} from "../../models/departement";
import {EditDepartmentComponent} from "../forms/edit-department/edit-department.component";
import {MediatechComponent} from "../mediatech/mediatech.component";

@Component({
  selector: 'app-mediatech-list',
  templateUrl: './mediatech-list.component.html',
  styleUrls: ['./mediatech-list.component.scss']
})
export class MediatechListComponent implements OnInit,OnDestroy {
  mediatechs:IMediatech[]=[];

  p: number = 1;
  total:number=1;


  mediaListSub : Subscription =new Subscription();

  constructor(
    private mediaService:MediatechService,
    private matDialog : MatDialog,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.mediaListSub.unsubscribe()
  }

  ngOnInit(): void {
    this.mediaListSub=this.mediaService.readMediatechList().subscribe({
      next:mediatechList=>{
        this.mediatechs = mediatechList.map((mediatech)=>{
          return {id:mediatech.payload.doc.id,...mediatech.payload.doc.data() as {}}as IMediatech
        })
        this.total = this.mediatechs.length
      },
      error:err=>console.error(err)
    })
  }

  onAddFileToMedia() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.hasBackdrop = true;
    let dialogRef = this.matDialog.open(MediatechComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: mediatech =>{
        if (mediatech!=null){
          console.log(mediatech)
        }
      },
      error: err => console.error(err)
    });
  }
}
