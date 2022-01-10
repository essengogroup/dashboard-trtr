import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../services/forms/site.service";
import {ISite} from "../../models/site";
import {IDepartement} from "../../models/departement";
import {ActivatedRoute, Router} from "@angular/router";
import {log} from "util";
import {concatMap, filter, map} from "rxjs/operators";

@Component({
  selector: 'app-site-par-departement',
  templateUrl: './site-par-departement.component.html',
  styleUrls: ['./site-par-departement.component.scss']
})
export class SiteParDepartementComponent implements OnInit {
  sites!: any[];
  departement!: IDepartement;
  departmentId!: string | null

  p: number = 1
  total: number = 1

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: departmentId => {
        this.departmentId = departmentId.get('id')
        if (this.departmentId) {
          this.getSiteByDepartment(this.departmentId)
        }
      }
    })

  }

  getSiteByDepartment(departmentID: string) {
    this.siteService.getSitesList()
      .pipe(
        concatMap(sites=>sites),
        filter((site:any)=>site.departement_id == "CgsU5w77yiLohdJAP6RJ")
      )
      .subscribe({
      next: sitesList => {
        console.log("list ",sitesList)
       /* this.sites = sitesList.map((site:any)=> {
          return {id: site.payload.doc.id, ...site.payload.doc.data() as {}} as ISite
        })

        this.total = this.sites.length*/
      }
      , error: err => console.error(err)
    })
  }

}
