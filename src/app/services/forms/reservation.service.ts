import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IReservation} from "../../models/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationCol: string = "reservations"

  constructor(
    private afirestore: AngularFirestore
  ) {
  }

  readReservationsNumList(){
    return this.afirestore.collection(this.reservationCol).doc().snapshotChanges()
  }

  readReservationsList(id:string , year:string) {
    return this.afirestore.collection(this.reservationCol).doc(id).collection(year)
      .snapshotChanges()
  }

  readReservations(id: string) {
    return this.afirestore.collection(this.reservationCol)
      .doc(id)
      .valueChanges()
  }

  createReservation(reservation: IReservation) {
    return new Promise<IReservation>(((resolve, reject) => {
        this.afirestore.collection(this.reservationCol)
          .add(reservation)
          .then(response => {
            console.log(response)
          }, error => reject(error))
      })
    )
  }

  deleteReservation(reservation: IReservation) {
    return this.afirestore.collection(this.reservationCol)
      .doc(reservation.id)
      .delete()
  }

  updateReservation(reservation: IReservation, id: string) {
    return this.afirestore.collection(this.reservationCol)
      .doc(id)
      .update(reservation)
  }
}
