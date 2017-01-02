/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */

import {Component, OnInit} from "@angular/core";
import {DRCService} from "./drc.service";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    loading: boolean;
    msgs: Message[] = [];

    constructor( private drcService : DRCService ) {
    }

    ngOnInit(): void {
        this.drcService.loading.subscribe(res => {
            this.loading = res as boolean;
        } );
        this.drcService.growl.subscribe(res => {
            this.msgs.push(res);
        } );
    }
}
