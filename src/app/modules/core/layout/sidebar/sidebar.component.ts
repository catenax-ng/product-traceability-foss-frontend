/********************************************************************************
 * Copyright (c) 2022, 2023 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
 * Copyright (c) 2022, 2023 ZF Friedrichshafen AG
 * Copyright (c) 2022, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getAboutRoute } from '@page/about/about-route';
import { getAdminRoute } from '@page/admin/admin-route';
import { getDashboardRoute } from '@page/dashboard/dashboard-route';
import { getInvestigationInboxRoute } from '@page/investigations/investigations-external-route';
import { getOtherPartsRoute } from '@page/other-parts/other-parts-route';
import { getPartsRoute } from '@page/parts/parts-route';
import { PageRoute } from '@shared/model/page-route.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() expanded: boolean;
  public activeMenu = '';

  private readonly menu: Record<string, PageRoute> = {
    dashboard: getDashboardRoute(),
    about: getAboutRoute(),
    parts: getPartsRoute(),
    otherParts: getOtherPartsRoute(),
    investigations: getInvestigationInboxRoute(),
    admin: getAdminRoute(),
  };

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects, url }: NavigationEnd) => {
        const currentUrl = urlAfterRedirects ?? url;
        this.activeMenu = Object.keys(this.menu).find(menuKey => currentUrl.includes(menuKey));
      });
  }

  public navigate(item: string): void {
    this.router.navigate([this.menu[item].link]).then();
    this.activeMenu = item;
  }
}
