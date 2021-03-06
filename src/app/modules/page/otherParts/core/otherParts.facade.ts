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

import { Injectable } from '@angular/core';
import { Pagination } from '@core/model/pagination.model';
import { OtherPartsService } from '@page/otherParts/core/otherParts.service';
import { OtherPartsState } from '@page/otherParts/core/otherParts.state';
import { Part } from '@page/parts/model/parts.model';
import { TableHeaderSort } from '@shared/components/table/table.model';
import { View } from '@shared/model/view.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class OtherPartsFacade {
  constructor(
    private readonly otherPartsService: OtherPartsService,
    private readonly otherPartsState: OtherPartsState,
  ) {}

  get customerParts$(): Observable<View<Pagination<Part>>> {
    // IMPORTANT: this delay is needed for view-container directive
    return this.otherPartsState.customerParts$.pipe(delay(0));
  }

  get supplierParts$(): Observable<View<Pagination<Part>>> {
    // IMPORTANT: this delay is needed for view-container directive
    return this.otherPartsState.supplierParts$.pipe(delay(0));
  }

  public setCustomerParts(page = 0, pageSize = 5, sorting: TableHeaderSort = null): void {
    this.otherPartsService.getCustomerParts(page, pageSize, sorting).subscribe({
      next: (partsPage: Pagination<Part>) => {
        this.otherPartsState.customerParts = { data: partsPage };
      },
      error: error => (this.otherPartsState.customerParts = { error }),
    });
  }

  public setSupplierParts(page = 0, pageSize = 5, sorting: TableHeaderSort = null): void {
    this.otherPartsService.getSupplierParts(page, pageSize, sorting).subscribe({
      next: (partsPage: Pagination<Part>) => {
        this.otherPartsState.supplierParts = { data: partsPage };
      },
      error: error => (this.otherPartsState.supplierParts = { error }),
    });
  }
}
