/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {DRCListComponent} from "./datalist/drclist.component";
import {InputTextModule} from "primeng/primeng";
import {ButtonModule} from "primeng/components/button/button";
import {SharedModule} from "primeng/components/common/shared";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {DRCService} from "./drc.service";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {DRCViewDataComponent} from "./viewdata/viewdata.component";
import {BreadcrumbModule} from "primeng/components/breadcrumb/breadcrumb";
import {ConfirmationService} from "primeng/components/common/api";
import {FieldsetModule} from "primeng/components/fieldset/fieldset";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {BlockUIModule} from "primeng/components/blockui/blockui";
import {GrowlModule} from "primeng/components/growl/growl";

@NgModule({
    declarations: [
        AppComponent,
        DRCListComponent,
        DRCViewDataComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        InputTextModule,
        ButtonModule,
        DataTableModule,
        SharedModule,
        MultiSelectModule,
        BreadcrumbModule,
        FieldsetModule,
        TabViewModule,
        InputSwitchModule,
        ConfirmDialogModule,
        BlockUIModule,
        GrowlModule,
        RouterModule.forRoot(rootRouterConfig, {useHash: false})
    ],
    bootstrap: [AppComponent],
    providers: [DRCService,ConfirmationService]
})
export class AppModule {

}
