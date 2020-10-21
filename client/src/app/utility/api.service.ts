import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class ApiService {

    constructor(private http: HttpClient) { }

    getComments(requestData?) {
        let url = `${environment.apiUrl}${environment.commentsEndpoint}`;
        if (requestData && requestData.id) {
            url += `?id=${requestData.id}`;
        }
        return this.http.get(url, { headers: new HttpHeaders({ 'x-api-key': environment.apiKey }) }).pipe(
            map((res: { code: number, data: any, message: string }) => {
                return res ? res.data : [];
            })
        );
    }

    postComment(requestData) {
        let url = `${environment.apiUrl}${environment.commentsEndpoint}`;
        return this.http.post(url, requestData, { headers: new HttpHeaders({ 'x-api-key': environment.apiKey }) });
    }

}