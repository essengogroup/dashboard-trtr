import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IDepartement} from "../../models/departement";
import {Observable} from "rxjs";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  departementCol: string = "departements"

  constructor(
    private afirestore: AngularFirestore
  ) {
  }

  readDeparementList() {
    return this.afirestore.collection(this.departementCol).snapshotChanges()
  }

  readDeparements(id: string) {
    return this.afirestore.collection(this.departementCol)
      .doc(id)
      .valueChanges()
  }

  createDepartement(departement: IDepartement) {
    return new Promise<IDepartement>(((resolve, reject) => {
        this.afirestore.collection(this.departementCol)
          .add(departement)
          .then(response => {
            console.log(response)
          }, error => reject(error))
      })
    )
  }

  deleteDepartement(departement: IDepartement) {
    return this.afirestore.collection(this.departementCol)
      .doc(departement.id)
      .delete()
  }

  updateDepartement(departement: IDepartement, id: string) {
    return this.afirestore.collection(this.departementCol)
      .doc(id)
      .update(departement)
  }
}
