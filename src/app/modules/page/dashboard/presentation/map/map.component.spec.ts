/********************************************************************************
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
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

import { DashboardModule } from '@page/dashboard/dashboard.module';
import { MapComponent } from '@page/dashboard/presentation/map/map.component';
import { renderComponent } from '@tests/test-render.utils';

// jasmine.createSpy('maplibre-gl/dist/maplibre-gl', () => ({
//   GeolocateControl: jasmine.createSpy(),
//   Map: jasmine.createSpyObj(() => ({
//     addControl: jasmine.createSpy(),
//     on: jasmine.createSpy(),
//     remove: jasmine.createSpy(),
//     resize: jasmine.createSpy(),
//     getLayer: jasmine.createSpy(),
//     addLayer: jasmine.createSpy(),
//   })),
//   NavigationControl: jasmine.createSpy(),
// }));

describe('Map', () => {
  const renderMap = mapData =>
    renderComponent(MapComponent, {
      declarations: [MapComponent],
      imports: [DashboardModule],
      translations: ['page.dashboard'],
      componentProperties: {
        mapData,
      },
    });

  it('should render map', async () => {
    const { fixture } = await renderMap([]);
    expect(fixture.componentInstance.map).toBeDefined();
  });

  it('should handle zoom', async () => {
    const { fixture } = await renderMap([]);

    // TODO: find a way to use spyOn inside MapComponent
    // spyOn(fixture.componentInstance.map, 'resize');
    // spyOn(fixture.componentInstance.map, 'addLayer');
    // expect(fixture.componentInstance.map.resize).toHaveBeenCalled();
    // expect(fixture.componentInstance.map.addLayer).toHaveBeenCalled();
  });
});
