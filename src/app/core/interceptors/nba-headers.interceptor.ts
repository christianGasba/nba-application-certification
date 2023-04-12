import { environment } from './../../../environments/environment.development';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NbaHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      headers: request.headers
        .set('X-RapidAPI-Key', `${environment.headerXRapidAPIKey}`)
        .set('X-RapidAPI-Host', `${environment.hostXRapidAPIHost}`),
    });
    return next.handle(modifiedReq);
  }
}
