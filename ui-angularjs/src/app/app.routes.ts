/*
 * Copyright (c) 2017. Kloudtek Software Solutions Ltd
 */

import {Routes} from "@angular/router";
import {DRCListComponent} from "./datalist/drclist.component";
import {DRCViewDataComponent} from "./viewdata/viewdata.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  { path: 'data', component: DRCListComponent} ,
  { path: 'data/:id', component: DRCViewDataComponent} ,
];

