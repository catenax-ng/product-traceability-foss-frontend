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

import { environment } from '@env';
import { rest } from 'msw';
import { mockAssetList, mockAssets, mockAssetsCountriesMap } from './parts.model';

export const partsHandlers = [
  rest.get(`${environment.apiUrl}/assets`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAssets));
  }),

  rest.get(`${environment.apiUrl}/assets/countries`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAssetsCountriesMap));
  }),

  rest.get(`${environment.apiUrl}/assets/:partId`, (req, res, ctx) => {
    const { partId } = req.params;
    return res(ctx.status(200), ctx.json(mockAssetList[partId as string]));
  }),

  rest.patch(`${environment.apiUrl}/assets/:partId`, (req, res, ctx) => {
    const { partId } = req.params;
    const currentPart = mockAssetList[partId as string];
    return res(ctx.status(200), ctx.json({ ...currentPart, ...(req.body as Record<string, any>) }));
  }),

  rest.get(`${environment.apiUrl}/assets/:assetId/children/:childId`, (req, res, ctx) => {
    const { childId } = req.params;
    return res(ctx.status(200), ctx.json(mockAssetList[childId as string]));
  }),
];
