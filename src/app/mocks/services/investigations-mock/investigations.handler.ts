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

import { environment } from '@env';
import { NotificationStatus } from '@shared/model/notification.model';
import { rest } from 'msw';
import { applyPagination, extractPagination } from '../pagination.helper';
import { buildMockInvestigations, getInvestigationById, InvestigationIdPrefix } from './investigations.model';

export const investigationsHandlers = [
  rest.get(`*${environment.apiUrl}/investigations/created`, (req, res, ctx) => {
    const pagination = extractPagination(req);

    const currentStatus = [
      NotificationStatus.CREATED,
      NotificationStatus.APPROVED,
      NotificationStatus.ACKNOWLEDGED,
      NotificationStatus.ACCEPTED,
      NotificationStatus.DECLINED,
    ];

    return res(
      ctx.status(200),
      ctx.json(applyPagination(buildMockInvestigations(currentStatus, 'SENDER'), pagination)),
    );
  }),

  rest.get(`*${environment.apiUrl}/investigations/received`, (req, res, ctx) => {
    const pagination = extractPagination(req);

    const currentStatus = [NotificationStatus.RECEIVED, NotificationStatus.ACKNOWLEDGED];
    return res(
      ctx.status(200),
      ctx.json(applyPagination(buildMockInvestigations(currentStatus, 'RECEIVER'), pagination)),
    );
  }),

  rest.get(`*${environment.apiUrl}/investigations/:investigationId`, (req, res, ctx) => {
    const { investigationId } = req.params;

    const indexFromId = parseInt((investigationId as string).replace('id-', ''), 10);

    const statusCollection = [
      NotificationStatus.CREATED,
      NotificationStatus.APPROVED,
      NotificationStatus.RECEIVED,
      NotificationStatus.CLOSED,
      NotificationStatus.CANCELED,
      NotificationStatus.ACKNOWLEDGED,
      NotificationStatus.ACCEPTED,
      NotificationStatus.DECLINED,
      NotificationStatus.ACKNOWLEDGED,
    ];
    const channel = indexFromId === 2 || indexFromId === 8 ? 'RECEIVER' : 'SENDER';
    const randomNotification = buildMockInvestigations([statusCollection[indexFromId]], channel)[0];

    return res(ctx.status(200), ctx.json({ ...randomNotification, id: investigationId }));
  }),

  rest.post(`*${environment.apiUrl}/investigations`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: InvestigationIdPrefix + 1 }));
  }),

  rest.put(`*${environment.apiUrl}/investigations/:investigationId/status`, (req, res, ctx) => {
    const { investigationId } = req.params;
    const { status } = req.body as Record<string, unknown>;

    const investigation = getInvestigationById(investigationId as string);
    return res(ctx.status(200), ctx.json({ ...investigation, status }));
  }),

  rest.post(`*${environment.apiUrl}/investigations/:investigationId/close`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post(`*${environment.apiUrl}/investigations/:investigationId/approve`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post(`*${environment.apiUrl}/investigations/:investigationId/cancel`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.post(`${environment.apiUrl}/investigations/:investigationId/update`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
