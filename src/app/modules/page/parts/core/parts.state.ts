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
import { Part } from '@page/parts/model/parts.model';
import { State, View } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class PartsState {
  private readonly _parts$: State<View<Part[]>> = new State<View<Part[]>>({ loader: true });
  private readonly _selectedPart: State<View<Part>> = new State<View<Part>>({ loader: true });

  get selectedPart$(): Observable<View<Part>> {
    return this._selectedPart.observable;
  }

  set selectedPart({ data, loader, error }: View<Part>) {
    const partDetailView: View<Part> = { data, loader, error };
    this._selectedPart.update(partDetailView);
  }

  get selectedPart(): View<Part> {
    return this._selectedPart.snapshot;
  }

  get parts$(): Observable<View<Part[]>> {
    return this._parts$.observable;
  }

  set parts({ data, loader, error }: View<Part[]>) {
    const partsView: View<Part[]> = { data, loader, error };
    this._parts$.update(partsView);
  }
}
