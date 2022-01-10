import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IMediatech} from "../models/mediatech";

@Injectable({
  providedIn: 'root'
})
export class MediatechService {
  private basePath = '/uploads';
  mediatechCol: string = "mediatech"

  constructor(
    private afirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }


  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  readMediatechList(){
    return this.afirestore.collection(this.mediatechCol).snapshotChanges()
  }

  readMediatech(id: string) {
    return this.afirestore.collection(this.mediatechCol)
      .doc(id)
      .valueChanges()
  }

  createMediatech(mediatech: IMediatech) {
    return new Promise<IMediatech>(((resolve, reject) => {
        this.afirestore.collection(this.mediatechCol)
          .add(mediatech)
          .then(response => {
            console.log(response)
          }, error => reject(error))
      })
    )
  }

  deleteMediatech(mediatech: IMediatech) {
    return this.afirestore.collection(this.mediatechCol)
      .doc(mediatech.id)
      .delete()
  }

  updateMediatech(mediatech: IMediatech, id: string) {
    return this.afirestore.collection(this.mediatechCol)
      .doc(id)
      .update(mediatech)
  }
}
