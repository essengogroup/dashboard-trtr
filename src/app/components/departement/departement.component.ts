import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartementService} from "../../services/forms/departement.service";
import { IDepartement} from "../../models/departement";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDepartmentComponent} from "../forms/edit-department/edit-department.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AddDepartementComponent} from "../forms/add-departement/add-departement.component";
import {AddSiteComponent} from "../forms/add-site/add-site.component";
import {SiteService} from "../../services/forms/site.service";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit , OnDestroy{

  departements:IDepartement[] = [];
  depListSub : Subscription =new Subscription();
  depDelSub : Subscription =new Subscription();

  p: number = 1;
  total:number=1;

  constructor(
    private departementService:DepartementService,
    private siteService:SiteService,
    private matDialog : MatDialog,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.depListSub.unsubscribe()
    this.depDelSub.unsubscribe()
  }

  ngOnInit(): void {
    this.depListSub=this.departementService.readDeparementList().subscribe({
      next:departementsList=>{
        this.departements = departementsList.map(departement=>{
          return {id:departement.payload.doc.id,...departement.payload.doc.data() as {}}as IDepartement
        })
        this.total = this.departements.length
      },
      error:err=>console.error(err)
    })
  }

  onDeleteDepartment(department:IDepartement){
    const result = confirm(`Voulez-vous vraiment supprimer ${department.name}?`)
    if (result){
      this.removeDepartment(department)
    }
  }

  removeDepartment(department:IDepartement){
    const index = this.departements.findIndex(res => res.id == department.id);
    const result = this.departements.splice(index, 1);
    if (result) {
      this.deleteToFirestore(department)
    }
  }

  deleteToFirestore(department:IDepartement){
     this.departementService.deleteDepartement(department)
       .then(res=>{
         console.log(res)
       }).catch(error=>console.error(error))
  }

  onEditDepartment(departement:IDepartement){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = departement
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    dialogConfig.hasBackdrop = true;
    let dialogRef = this.matDialog.open(EditDepartmentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: department =>{
        if (department!=null){
          this.departementService.updateDepartement(departement,department.id).then(res=>{
            console.log("updated")
          })
        }
      },
      error: err => console.error(err)
    });
  }


  onShowSite(departement: IDepartement) {
    this.router.navigate([departement.id],{state:{item:departement},relativeTo:this.route}).then(()=>{})
  }

  onAddDepartment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    dialogConfig.hasBackdrop = true;
    let dialogRef = this.matDialog.open(AddDepartementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: department =>{
        if (department!=null){
          console.log(department)
        }
      },
      error: err => console.error(err)
    });
  }

  onAddSite(departement: IDepartement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=departement;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.hasBackdrop = true;
    let dialogRef = this.matDialog.open(AddSiteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: site =>{
        if (site!=null){
          console.log(site)
          //this.siteService.createSite(site).then(r => console.log(r))
        }
      },
      error: err => console.error(err)
    });
  }
}
