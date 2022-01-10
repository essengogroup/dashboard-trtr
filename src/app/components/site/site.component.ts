import {Component, OnInit} from '@angular/core';
import {ISite} from "../../models/site";
import {SiteService} from "../../services/forms/site.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditSiteComponent} from "../forms/edit-site/edit-site.component";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  sites: ISite[] = [];
  siteListSub: Subscription = new Subscription()

  p: number = 1;
  total: number = 1;

  constructor(
    private siteService: SiteService,
    private route:ActivatedRoute,
    private router:Router,
    private matDialog:MatDialog
  ) {
  }

  ngOnInit(): void {
    this.siteService.readSitesList().subscribe({
      next: sitesList => {
        this.sites = sitesList.map(site => {
          return {id: site.payload.doc.id, ...site.payload.doc.data() as {}} as ISite
        })

        this.total = this.sites.length
      }
      , error: err => console.error(err)
    })
  }

  onGoToReservation(site: ISite) {
    this.router.navigate([site.id],{state:{item:site},relativeTo:this.route}).then(()=>{})
  }

  onEditSite(site: ISite) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=site;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.hasBackdrop = true;
    let dialogRef = this.matDialog.open(EditSiteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (site:ISite) =>{
        if (site!=null){
          this.siteService.updateSite(site,site.id).then(r => console.log("updated"))
        }
      },
      error: err => console.error(err)
    });
  }

  onDeleteSite(site: ISite) {
    const result = confirm(`Voulez-vous supprimer le site ${site.name}`);
    if (result){
      this.siteService.deleteSite(site).then(r=>{console.log("deleted")})
    }
  }
}
