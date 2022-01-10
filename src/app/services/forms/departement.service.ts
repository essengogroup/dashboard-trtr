import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IDepartement} from "../../models/departement";
import {FileUpload} from "../../models/fileUpload";
import {Observable} from "rxjs";
import {finalize, timestamp} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  departementCol: string = "departements"
  private basePath = '/uploads';

  constructor(
    private afirestore: AngularFirestore,
    private storage: AngularFireStorage
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
      .update({
        name:departement.name,
        image:departement.image
      })
  }


  uploadFileToStorage(fileUpload: FileUpload,departement: IDepartement): Observable<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;

          departement.image = downloadURL;
          this.saveFileData(fileUpload,departement);
        });
      })
    );

  }

  private saveFileData(fileUpload: FileUpload,departement: IDepartement): void {
    let safeName = fileUpload.name.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
    let timestamp = Date.now();                                     // ex: '1598066351161'
    const uniqueSafeName = timestamp + '_' + safeName;
    const path = 'uploads/' + uniqueSafeName;

    this.afirestore.collection('mediatech').doc(uniqueSafeName).set({
      storagePath: path,
      downloadURL: fileUpload.url,
      originalName: fileUpload.name,
      timestamp: timestamp
    })
      .then(function () {
        console.log('document written!');
      })
      .catch(function (error) {
        console.error('Error writing document:', error);
      })
    this.createDepartement(departement).then(r => {console.log('created')})
  }
}
