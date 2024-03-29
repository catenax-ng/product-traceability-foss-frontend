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

import type { NotificationResponse } from '@shared/model/notification.model';
import { NotificationStatus } from '@shared/model/notification.model';
import { getRandomAsset } from '../parts-mock/parts.model';
import { MOCK_part_1 } from '../parts-mock/parts.test.model';

export const InvestigationIdPrefix = 'id-';
export const buildMockInvestigations = (
  statuses: NotificationStatus[],
  channel: 'SENDER' | 'RECEIVER',
): NotificationResponse[] =>
  new Array(25).fill(null).map((_, index) => {
    const status = statuses[index % statuses.length];
    return {
      id: `${InvestigationIdPrefix}${index + 1}`,
      description: `Investigation No ${index + 1}`,
      status,
      channel,
      createdBy: 'BPNL00000003AYRE',
      createdDate: `2022-05-${(index + 1).toString().padStart(2, '0')}T12:34:12`,
      assetIds: [MOCK_part_1.id, getRandomAsset().id, getRandomAsset().id, getRandomAsset().id],
    };
  });

const MockEmptyInvestigation: NotificationResponse = {
  id: `${InvestigationIdPrefix}000`,
  description: `Investigation No 000`,
  status: NotificationStatus.CREATED,
  createdBy: 'OEM A',
  createdDate: `2022-05-01T12:34:12`,
  assetIds: [getRandomAsset().id],
  channel: 'SENDER',
};

export const getInvestigationById = (id: string) => {
  return [].find(investigation => investigation.id === id) || { ...MockEmptyInvestigation, id };
};
