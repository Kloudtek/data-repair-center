/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */

import {Component, OnInit} from "@angular/core";
import {DRCDataOverview, DRCService, DRCDataOverviewList} from "../drc.service";
import {LazyLoadEvent, MenuItem} from "primeng/components/common/api";
import {Router} from "@angular/router";

@Component({
    selector: 'drclist',
    templateUrl: 'drclist.component.html'
})
export class DRCListComponent implements OnInit {
    private bcHomeMenu: MenuItem = {routerLink: ['/data']};
    private bcMenu: MenuItem[];
    list: DRCDataOverview[];
    count: number;
    offset: number;
    rows: number;
    selection: DRCDataOverview;

    constructor(private router: Router, private drcService: DRCService) {
    }

    ngOnInit() {
        this.bcMenu  = [];
        this.bcMenu.push({label:'Data List', routerLink: ['/data']});
    }

    load() {
        this.drcService.getOverviews( this.offset, this.rows ).subscribe(
            response => this.update(response)
        )
    }

    lazyLoad(event: LazyLoadEvent) {
        this.offset = event.first;
        this.rows = event.rows;
        this.load();
    }

    update( ovlist : DRCDataOverviewList ) {
        this.list = ovlist.results;
        this.count = ovlist.count;
    }

    onRowSelect(event) {
        if( this.selection != null ) {
            this.router.navigate(['/data/', this.selection.id]);
        }
    }

    unselect() {
        this.selection = null;
    }

    logError( error ) {
        alert(error);
    }
}
