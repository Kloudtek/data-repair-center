/*
 * Copyright (c) 2016. Kloudtek Software Solutions Ltd
 */

import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

export interface DRCDataOverviewList {
    results : DRCDataOverview[];
    count : number;
    offset : number;
}

export interface DRCDataOverview {
    id : string;
    businessId : string;
    mimeType : string;
    dataType : string;
    origin : string;
    originId : string;
    retry : number;
    timestamp : string;
    correlationId : string;
}

export interface DRCData extends DRCDataOverview {
    data : string;
    metadata : string;
}

@Injectable()
export class DRCService {
    url: string = "http://localhost:8081/api/";;;;;;;;;;;;

    constructor(private http: Http) {
    }

    getOverviews(first: number, rows: number): Observable<DRCDataOverviewList> {
        console.log("Retrieving "+rows+" data overview from "+this.url+"/messages with offset "+first);
        return this.http.get(this.url+"messages?limit="+rows+"&offset="+first) .map(response => response.json());
    }
}