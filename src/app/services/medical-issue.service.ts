//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
import { Injectable } 				from '@angular/core';

//------------------------
// RXJS
//------------------------
import { Observable } 				from 'rxjs';
import { throwError } 				from 'rxjs';

//------------------------
// API_URL
//------------------------
import { API_URL } 					from '../core/config/config';


//------------------------
// HTTP LIBRARY
//------------------------
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } 		from '@angular/common/http';
import { catchError } 				from 'rxjs/operators';

//------------------------
// INTERFACES
//------------------------
import { GenericRecord } 			from '../models/interfaces/visits/generic-record.interface';

@Injectable({
	providedIn: 'root'
})
export class MedicalIssueService {
	constructor(
		private http: HttpClient
	) { }

	//Returns list of all medical issues
	public GetMedicalIssues(): Observable<GenericRecord[]> {
		let url = API_URL + 'MedicalIssue/GetMedicalIssues';

		return this.http.get<GenericRecord[]>(url).pipe(
			catchError(this.handleError)
		);
	}
	
	//Returns an individual medical issue
	public GetMedicalIssue(ID: number): Observable<GenericRecord> {
		let url = API_URL + 'MedicalIssue/GetMedicalIssues';

		let Params = new HttpParams();
	  	Params = Params.append('ID', ID.toString());
	  
		return this.http.get<GenericRecord>(url).pipe(
			catchError(this.handleError)
		);
	}
	


	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError(
			'Something bad happened; please try again later.');
	};

}
