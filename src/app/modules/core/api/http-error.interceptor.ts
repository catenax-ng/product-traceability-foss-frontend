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

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from 'src/app/modules/shared/components/notifications/notification.service';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<Record<string, unknown>>,
    next: HttpHandler,
  ): Observable<HttpEvent<Record<string, unknown>>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (Array.isArray(error.error.error)) {
          errorMessage = `An error occurred: ${error.error.message}`;
          error.error.error.forEach(message => (errorMessage = message.message));
        } else if (error.message) {
          errorMessage = error.message;
        } else {
          errorMessage = `Backend returned code ${error.status}: ${error.message}`;
        }
        this.notificationService.error(errorMessage);
        return throwError(errorMessage);
      }),
    );
  }
}
