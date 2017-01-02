/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DRCService, DRCData} from "../drc.service";
import "rxjs/add/operator/switchMap";
import {MenuItem, ConfirmationService} from "primeng/components/common/api";

@Component({
    selector: 'drcviewdata',
    templateUrl: 'viewdata.component.html'
})
export class DRCViewDataComponent implements OnInit {
    bcHomeMenu: MenuItem = {routerLink: ['/data']};
    bcMenu: MenuItem[];
    editing : boolean = false;
    nonRawData : boolean;
    data : DRCData;
    metadataJson: string;
    dataDisplay : string;
    dataEdit : DRCData;
    isText: boolean;
    editDataIsText: boolean;
    dataEditField : string;
    dataEditMetadata : string;

    constructor(  private router: Router,
                  private drcService: DRCService,
                  private route: ActivatedRoute,
                  private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.bcMenu  = [];
        this.bcMenu.push({label:'Data List', routerLink: ['/data']});
        this.route.params
            .switchMap((params: Params) => this.drcService.getData(params['id']))
            .subscribe(data => this.setData(data));
    }

    edit() {
        this.editing = true;
        this.dataEdit = JSON.parse(JSON.stringify(this.data)) as DRCData;
        this.editDataIsText = DRCViewDataComponent.isText(this.dataEdit);
        this.nonRawData = this.editDataIsText;
        if (this.nonRawData) {
            this.dataEditField = atob(this.dataEdit.data);
        } else {
            this.dataEditField = this.dataEdit.data;
        }
        this.dataEditMetadata = JSON.stringify(this.dataEdit.metadata,null,2);
    }

    cancelEdit() {
        this.editing = false;
    }

    saveEdit() {
        try {
            this.dataEdit.metadata = JSON.parse(this.dataEditMetadata);
        }
        catch(err) {
            alert("Metadata is not valid JSON");
            return;
        }
        this.editing = false;
        if( this.nonRawData ) {
            this.dataEdit.data = btoa(this.dataEditField);
        } else {
            this.dataEdit.data = this.dataEditField;
        }
        this.drcService.saveData(this.dataEdit).subscribe(
            res => {
                console.log("Saved data: "+res);
                this.setData(this.dataEdit);
            },
            err => {
                alert(err);
            }
        )
    }

    mimeTypeChanged(e) {
        let isTextNow: boolean = DRCViewDataComponent.isText(this.dataEdit);
        console.log("isTextNow= "+isTextNow);
        if( this.editDataIsText != isTextNow ) {
            let switchRequired: boolean = this.nonRawData != isTextNow;
            this.nonRawData = isTextNow;
            this.editDataIsText = isTextNow;
            if( switchRequired ) {
                this.switchDataEditMode();
            }
        }
    }

    private switchDataEditMode() {
        console.log("Switching mode");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        if (this.nonRawData) {
            console.log("Converting from b64 to text since nonRawData is true");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            this.dataEditField = atob(this.dataEditField);
        } else {
            console.log("Converting from text to b64 since nonRawData is false");;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            this.dataEditField = btoa(this.dataEditField);
        }
    }

    dataSwitchChanged(e) {
        this.nonRawData = e.checked;
        this.switchDataEditMode();
    }

    delete() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this data ?',
            accept: () => {
                this.drcService.deleteData(this.data.id).subscribe(
                    res => {
                        console.log("deleted data "+this.data.id);
                        this.router.navigate(['/data/']);
                    }
                );
            }
        });
    }

    resubmitData() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to re-submit this data ?',
            accept: () => {
                this.drcService.resubmitData(this.data).subscribe(
                    res => {
                        console.log("resubmitted data "+this.data.id);
                        this.router.navigate(['/data/']);
                    }
                );
            }
        });
    }

    setData( data : DRCData ) {
        this.bcMenu.push({label:data.id});
        this.data = data;
        this.metadataJson = JSON.stringify(data.metadata,null,2);
        this.isText = DRCViewDataComponent.isText(this.data);
        if (this.isText) {
            this.dataDisplay = atob(this.data.data);
        } else {
            this.dataDisplay = this.data.data;
        }
        console.log("Loaded data: "+data.id);
    }

    static isText( data : DRCData ) {
        return data.mimeType != null && ( data.mimeType.startsWith("text/") || DRCService.textMimeTypes.indexOf(data.mimeType) > -1 );
    }
}
