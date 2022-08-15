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

import { CalendarDateModel } from '@core/model/calendar-date.model';
import { Pagination, PaginationResponse } from '@core/model/pagination.model';
import { PaginationAssembler } from '@core/pagination/pagination.assembler';
import {
  Part,
  PartResponse,
  PartsCountriesMap,
  PartsCountriesMapResponse,
  QualityType,
  SortableHeaders,
} from '@page/parts/model/parts.model';
import { TableHeaderSort } from '@shared/components/table/table.model';
import { View } from '@shared/model/view.model';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

const idBlacklist = [
  'urn:uuid:dddc85f9-29a1-4fe3-9a47-ddf8f1436afa',
  'urn:uuid:8af304ca-fd48-43bf-90a0-851703732dcf',
  'urn:uuid:7a2efb73-94bd-42ed-8aaa-751eec694694',
  'urn:uuid:ba738874-5cf6-4e16-9aa1-0161b1c3b039',
  'urn:uuid:de438b95-18e5-427d-b44a-048a63a353dd',
  'urn:uuid:6c6526df-f86d-42bb-b16e-4cabfa7c464c',
  'urn:uuid:0f91a172-65b7-49c2-ad9c-a6860300b9a4',
  'urn:uuid:b22505c1-d99f-4760-826b-9c23db7646d1',
  'urn:uuid:f87eeb0f-62b1-41e2-944b-5b0f4cacc5b6',
  'urn:uuid:dde61b0e-590f-4fbb-b68a-2dc55e7cdaae',
  'urn:uuid:a37e3f16-e012-4252-a2a9-d58ab7c88293',
  'urn:uuid:0fbf34bd-2921-4e0d-b409-3691063fea22',
  'urn:uuid:5ef7770f-c75e-402c-afc9-fedc6d3c1c68',
  'urn:uuid:a1d33f77-390d-42ed-a632-a27738986d4b',
  'urn:uuid:cbc6e2eb-f116-4b39-84bf-12ce53c145c0',
  'urn:uuid:8f462de5-422a-476d-823f-f207080ea432',
  'urn:uuid:5cd838c3-be9c-424a-aec7-505366098db5',
  'urn:uuid:6618c932-66bd-4bcf-a8a3-1b4e9a335e07',
  'urn:uuid:84cca29c-be6e-43b8-8b1f-f5bd682ac1f8',
  'urn:uuid:0f4620c0-0190-4661-8e3a-34594c953a66',
  'urn:uuid:949451ab-430a-4282-ae92-24a61b02e985',
  'urn:uuid:752d5be2-3ac4-49fa-b366-6f178f12ae81',
  'urn:uuid:9a2255e4-77a9-4fd8-9920-39f7ec018e4b',
  'urn:uuid:462016fc-09b3-4ddf-bc0e-8d3e76fe54c8',
  'urn:uuid:ca56b837-c14a-44a7-8ec8-cc4bdc51560c',
  'urn:uuid:a8e93d6d-93b5-45f6-9858-e78468cf0e50',
  'urn:uuid:acaf6552-c1b3-4962-9e40-67c15ef5c3f6',
  'urn:uuid:901c3061-2b80-4b1a-bf68-b5b2292c0a89',
  'urn:uuid:06a771b1-cc7e-408a-9f61-732fb783cd7e',
  'urn:uuid:71475e9c-03ab-44c5-9637-8bb224e9530e',
  'urn:uuid:5a5f9bd6-a631-4a0d-8874-56999e075f39',
  'urn:uuid:75b14a4d-4bc1-4fbf-870e-780357df3e03',
  'urn:uuid:38ed4583-1191-4996-a2c5-4500240160d3',
  'urn:uuid:c3bf2039-f835-42e3-8874-227e928fc6cb',
  'urn:uuid:926457b6-a3f3-4c11-b631-a76be2949bc3',
  'urn:uuid:1ea48d40-1fec-4d6e-8e39-c48ac7bda172',
  'urn:uuid:4017d3c2-590c-4239-910b-0a86e9d24f7e',
  'urn:uuid:1404b29e-5088-4324-9c53-279abc75a4a2',
  'urn:uuid:9f437c80-6e26-4c38-9743-f522cf5bf5a1',
  'urn:uuid:f4c5e549-7e13-4b92-9bb3-bf4cc82f8a21',
  'urn:uuid:aaf831c4-5b52-40e4-bdf2-e187bc46e5e9',
  'urn:uuid:e71cb77f-27f1-42cf-8498-3206a862270b',
  'urn:uuid:b82864dc-526d-418a-a04e-30da7fd62e5a',
];

export class PartsAssembler {
  public static assemblePart(part: PartResponse): Part {
    if (!part) {
      return null;
    }

    return {
      id: part.id,
      name: part.nameAtManufacturer,
      manufacturer: part.manufacturerName,
      serialNumber: part.manufacturerPartId,
      partNumber: part.customerPartId,
      productionCountry: part.manufacturingCountry,
      nameAtCustomer: part.nameAtCustomer,
      customerPartId: part.customerPartId,
      qualityType: part.qualityType || QualityType.Ok,
      productionDate: new CalendarDateModel(part.manufacturingDate),
      children: part.childDescriptions.filter(childId => !idBlacklist.includes(childId.id)).map(child => child.id),
    };
  }

  public static assembleOtherPart(part: PartResponse): Part {
    if (!part) {
      return null;
    }

    return { ...PartsAssembler.assemblePart(part), qualityType: part.qualityType };
  }

  public static assembleAssetsCountryMap(partsCountriesMap: PartsCountriesMapResponse): PartsCountriesMap {
    if (!partsCountriesMap || typeof partsCountriesMap !== 'object') {
      return null;
    }

    return partsCountriesMap;
  }

  public static assembleParts(parts: PaginationResponse<PartResponse>): Pagination<Part> {
    if (!parts || !parts.content.length) {
      return null;
    }
    return PaginationAssembler.assemblePagination(parts, PartsAssembler.assemblePart);
  }

  public static assembleOtherParts(parts: PaginationResponse<PartResponse>): Pagination<Part> {
    if (!parts || !parts.content.length) {
      return null;
    }
    return PaginationAssembler.assemblePagination(parts, PartsAssembler.assembleOtherPart);
  }

  public static filterPartForView(viewData: View<Part>): View<Part> {
    if (!viewData || !viewData.data) {
      return viewData;
    }
    const { name, productionDate, qualityType, serialNumber } = viewData.data;
    return { data: { name, productionDate, qualityType, serialNumber } as Part };
  }

  public static mapPartForView(): OperatorFunction<View<Part>, View<Part>> {
    return map(PartsAssembler.filterPartForView);
  }

  public static mapPartForManufacturerView(): OperatorFunction<View<Part>, View<Part>> {
    return map(viewData => {
      if (!viewData.data) {
        return viewData;
      }

      const { manufacturer, partNumber, serialNumber } = viewData.data;
      return { data: { manufacturer, partNumber, serialNumber } as Part };
    });
  }

  public static mapPartForCustomerView(): OperatorFunction<View<Part>, View<Part>> {
    return map(viewData => {
      if (!viewData.data) {
        return viewData;
      }

      const { nameAtCustomer, customerPartId } = viewData.data;
      return { data: { nameAtCustomer, customerPartId } as Part };
    });
  }

  public static mapSortToApiSort(sorting: TableHeaderSort): string {
    if (!sorting) {
      return '';
    }

    const localToApiMapping = new Map<SortableHeaders, string>([
      ['id', 'id'],
      ['name', 'nameAtManufacturer'],
      ['manufacturer', 'manufacturerName'],
      ['serialNumber', 'manufacturerPartId'],
      ['partNumber', 'customerPartId'],
      ['productionCountry', 'manufacturingCountry'],
      ['nameAtCustomer', 'nameAtCustomer'],
      ['customerPartId', 'customerPartId'],
      ['qualityType', 'qualityType'],
      ['productionDate', 'manufacturingDate'],
    ]);

    return `${localToApiMapping.get(sorting[0])},${sorting[1]}`;
  }
}
