import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Animal, StrapiPagination, TempTypeAnimal } from '../../../../sheltify-access/projects/sheltify-access/src/types/types';
import { Observable, map } from 'rxjs';
import { CMS_ADMIN_URL, CMS_PUBLIC_URL } from '@sheltify-lib/config';

export type EntryMetaData = {
  availableStatus: {
    //todo
  }
}

export type CollectionResult<T> = {
  results: T[],
}

export type EntryResult<T> = {
  data: T,
  meta: EntryMetaData,
}

@Injectable({
  providedIn: 'root'
})
export class CmsRequestService {

  private strapiAuthService = inject(AuthService);
  private httpClient = inject(HttpClient);

  public static readonly adminApiUrl = 'http://localhost:3000/admin/api/';
  public static readonly publicApiUrl = 'http://localhost:3000/api/';

  private get options() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.strapiAuthService.bearer}`,
      },
      withCredentials: true,
    };
  }


  public getCollection<T>(paht: string, pageSize = 50, page = 1): Observable<CollectionResult<T>> {
    const url = `${CMS_ADMIN_URL}${paht}`;

    return this.get<CollectionResult<T>>(url);
  }

  public getPublicCollection<T>(path: string, pageSize = 50, page = 1): Observable<CollectionResult<T>> {
    return this.get<T[]>(`${CMS_PUBLIC_URL}${path}`).pipe(map(response => ({
      results: response,
    })));
  }

  public getEntry<T>(path: string, id: string): Observable<T[]> {
    const tenantId = this.strapiAuthService.getTenantID();
    return this.get<T[]>(`${CMS_PUBLIC_URL}${path}/${tenantId}/${id}`)
  }


  public getTenantsAnimals(): Observable<CollectionResult<TempTypeAnimal>> {
    const tenantId = this.strapiAuthService.getTenantID();
    return this.get<TempTypeAnimal[]>(`${CMS_PUBLIC_URL}${tenantId}/animals`).pipe(map(response => ({
      results: response,
    })));
  }

  public getTenantsAnimal(id: string): Observable<TempTypeAnimal> {
    const tenantId = this.strapiAuthService.getTenantID();
    return this.get<TempTypeAnimal>(`${CMS_PUBLIC_URL}${tenantId}/animals/${id}`)
  }

  private get<T>(path: string): Observable<T> {
    let url = decodeURIComponent(path);
    return this.httpClient.get<T>(url, this.options)
  }

  public post<T>(path: string, body: any) {
    let url = decodeURIComponent(CmsRequestService.adminApiUrl + path);
    return this.httpClient
      .post(url, body, this.options)
  }
}
