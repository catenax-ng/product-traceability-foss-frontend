/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { View } from '@shared/model/view.model';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../abstraction/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public numberOfMyParts$: Observable<View<number>>;
  public numberOfBranchParts$: Observable<View<number>>;
  public assetsPerCountry$: Observable<View<any>>;

  constructor(private dashboardFacade: DashboardFacade) {
    this.numberOfMyParts$ = this.dashboardFacade.numberOfMyParts$;
    this.numberOfBranchParts$ = this.dashboardFacade.numberOfBranchParts$;
    this.assetsPerCountry$ = this.dashboardFacade.assetsPerCountry$;
  }

  ngOnInit(): void {
    this.dashboardFacade.setNumberOfParts();
  }
}
