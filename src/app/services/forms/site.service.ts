import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ISite} from "../../models/site";
import {Observable} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {FileUpload} from "../../models/fileUpload";
import {IDepartement} from "../../models/departement";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  siteCol: string = "sites"
  private basePath = '/uploads';

  constructor(
    private afirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  getSitesListbyDepartment(departmentID:string):Observable<ISite[]>{
    return this.afirestore.collection(this.siteCol,
        ref =>ref.where('departement_id','==',departmentID))
      .snapshotChanges()
      .pipe(
        map(sitesList=>{
          return sitesList.map(site=>{
            return <ISite>{
              id:site.payload.doc.id,
              ...site.payload.doc.data() as {}
            };
          })
        })
      )
  }

  getSitesList() {
    return this.afirestore.collection(this.siteCol).valueChanges();
  }

  readSitesList() {
    return this.afirestore.collection(this.siteCol).snapshotChanges();
  }

  readSites(id: string) {
    return this.afirestore.collection(this.siteCol)
      .doc(id)
      .valueChanges()
  }

  createSite(site: ISite) {
    return new Promise<ISite>(((resolve, reject) => {
        this.afirestore.collection(this.siteCol)
          .add(site)
          .then(response => {
            console.log(response)
          }, error => reject(error))
      })
    )
  }

  deleteSite(site: ISite) {
    return this.afirestore.collection(this.siteCol)
      .doc(site.id)
      .delete()
  }

  updateSite(site: ISite, id: string) {
    return this.afirestore.collection(this.siteCol)
      .doc(id)
      .update({
        name:site.name,
        consign:site.consign,
        departement:site.departement,
        departement_id:site.departement_id,
        avantages:site.avantages,
        description:site.description,
        galery:site.galery,
        price:site.price,
        visite:site.visite,
        stars:site.stars,
        image:site.image
      })
  }


  uploadFileToStorage(fileUpload: FileUpload,site: any): Observable<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;

          site.image = downloadURL;
          this.saveFileData(fileUpload,site);
        });
      })
    );

  }

  private saveFileData(fileUpload: FileUpload,site: any): void {
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
    this.createSite(site).then(r => {console.log('created')})
  }
}
