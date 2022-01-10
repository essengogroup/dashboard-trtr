import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../services/forms/reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IReservation} from "../../models/reservation";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservations:IReservation[]=[];
  siteID!:string | null;

  p: number = 1;
  total:number=1;

  constructor(
    private reservationService:ReservationService,
    protected route:ActivatedRoute,
    protected router:Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:params=>{
        this.siteID=params.get('id')
        if (this.siteID){
          this.getReservations(this.siteID,"2021")
        }
      },
      error:err => console.error(err)
    })
  }

  getReservations(id:string,year:string){
    this.reservationService.readReservationsList(id,year).subscribe({
      next:reservationList=>{
        this.reservations = reservationList.map(reservation=>{
          return {id:reservation.payload.doc.id,...reservation.payload.doc.data() as {}}as IReservation
        })
        this.total = this.reservations.length
      },
      error:err=>console.error(err)
    })
  }

}
