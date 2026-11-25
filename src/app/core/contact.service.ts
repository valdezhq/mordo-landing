import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website?: string;
  startedAt?: number;
  site?: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(environment.contactApiUrl, payload);
  }
}