/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */

import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";

export class DRCDataOverviewList {
    results : DRCDataOverview[];
    count : number;
    offset : number;
}

export class DRCDataOverview {
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

export class DRCData extends DRCDataOverview {
    data : string;
    metadata : string;
}

@Injectable()
export class DRCService {
    static textMimeTypes : string[] = [
        "application/json","application/xml"
    ];
    url: string = "http://localhost:8081/api/";
    loading = new Subject();
    growl = new Subject();

    constructor(private http: Http) {
    }

    private startMonitoring() {
        this.loading.next(true);
    }

    public monitorLoading<T>(o : Observable<T>, success ?: any ) : Observable<T> {
        let sharedSub = o.share();
        sharedSub.subscribe(null,err => {
            console.log("Received loading error: "+err);
            this.loading.next(false);
            let msg;
            if( err.status == 0 ) {
                msg = "Unable to contact server";
            } else {
                msg = "Server returned error code " + err.status;
                try {
                    if (err._body != null) {
                        let errObj = JSON.parse(err._body);
                        if( errObj.message != null ) {
                            msg += " : "+errObj.message;
                        }
                    }
                } catch (e) {
                }
            }
            this.growl.next({severity:'error', summary:msg});
        }, () => {
            this.loading.next(false);
            if( success != null ) {
                success();
            }
        } );
        return sharedSub;
    }

    getOverviews(first: number, rows: number): Observable<DRCDataOverviewList> {
        this.startMonitoring();
        console.log("Retrieving "+rows+" data overview from "+this.url+"/messages with offset "+first);
        return this.monitorLoading(this.http.get(this.url+"messages?limit="+rows+"&offset="+first).map(response => response.json()),() => {console.log("@#$$#$#@$#@$#@$#@@$#")});
    }

    getData(id : string) : Observable<DRCData> {
        this.startMonitoring();
        console.log("Retrieving data item: "+id);
        return this.monitorLoading(this.http.get(this.url+"messages/"+id).map(response => response.json() as DRCData));
    }

    saveData(data: DRCData) : Observable<any> {
        this.startMonitoring();
        console.log("Saving "+JSON.stringify(data));
        return this.monitorLoading(this.http.put(this.url+"messages/"+data.id, data));
    }

    deleteData(id: string) : Observable<any> {
        this.startMonitoring();
        console.log("Deleting data "+id);
        return this.monitorLoading(this.http.delete(this.url+"messages/"+id));
    }

    resubmitData(data: DRCData) : Observable<any> {
        this.startMonitoring();
        console.log("!@#!@#!@#!@#@!@!#@!#!@#!@#");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        console.log("Resubmitting data "+data.id);
        return this.monitorLoading(this.http.put(this.url+"messages/"+data.id+"?submit=true",data),() => {
            this.growl.next({severity:'info', detail:'Resubmitted data '+data.id})
        });
    }
}