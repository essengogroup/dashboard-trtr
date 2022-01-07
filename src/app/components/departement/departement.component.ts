import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartementService} from "../../services/forms/departement.service";
import { IDepartement} from "../../models/departement";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit , OnDestroy{

  departements:IDepartement[] = [];
  depListSub : Subscription =new Subscription();
  constructor(
    private departementService:DepartementService
  ) { }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.depListSub=this.departementService.readDeparementList().subscribe({
      next:departementsList=>{
        this.departements = departementsList.map(departement=>{
          return {id:departement.payload.doc.id,...departement.payload.doc.data() as {}}as IDepartement
        })
      },
      error:err=>console.error(err)
    })
  }


}
