import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ApplyService {

	private registrarUrl = "http://localhost:3000/registrar/"
	private applicantsUrl = "http://localhost:3000/applicants/"
	private awardedUrl = "http://localhost:3000/awarded/"

	constructor(private http: HttpClient) { }

	addApplicant(student:any) {
		return this.http.post(this.applicantsUrl, student)
	}

	getRegistrar() {
		return this.http.get(this.registrarUrl)
	}

	getApplicants() {
		return this.http.get(this.applicantsUrl)
	}

	addAwarded(winner: any) {
		return this.http.post<any>(this.awardedUrl, winner)
	}
}
