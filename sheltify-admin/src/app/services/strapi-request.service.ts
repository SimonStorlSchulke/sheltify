import { Injectable, inject } from '@angular/core';
import { StrapiAuthService } from './strapi-auth.service';
import { HttpClient } from '@angular/common/http';
import { Animal, StrapiPagination } from '../../../../sheltify-access/projects/sheltify-access/src/types/types';
import { Observable } from 'rxjs';

export type EntryMetaData = {
  availableStatus: {
    //todo
  }
}

export type CollectionResult<T> = {
  results: T[],
  pagination: StrapiPagination,
}

export type EntryResult<T> = {
  data: T,
  meta: EntryMetaData,
}

@Injectable({
  providedIn: 'root'
})
export class StrapiRequestService {

  private strapiAuthService = inject(StrapiAuthService);
  private httpClient = inject(HttpClient);

  private contentManagerUrl = 'http://localhost:1337/content-manager/';

  private get options() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.strapiAuthService.bearer}`,
      }
    };
  }


  public getCollection<T>(collectionName: string, pageSize = 50, page = 1): Observable<CollectionResult<T>> {
    const url = `${this.contentManagerUrl}collection-types/api::${collectionName}.${collectionName}?page=${page}&pageSize=${pageSize}&sort=name%3AASC`;

    return this.get<CollectionResult<T>>(url);
  }

  public getEntry<T>(collectionName: string, documentId: string): Observable<EntryResult<T>> {
    const url = `${this.contentManagerUrl}collection-types/api::${collectionName}.${collectionName}/${documentId}`;
    return this.get<EntryResult<T>>(url);
  }

  private get<T>(path: string): Observable<T> {
    let url = decodeURIComponent(path);
    return this.httpClient
      .get<T>(url, this.options)
  }

  public post<T>(path: string, body: any) {
    let url = decodeURIComponent(this.contentManagerUrl + path);
    return this.httpClient
      .post(url, body, this.options)
  }
}
