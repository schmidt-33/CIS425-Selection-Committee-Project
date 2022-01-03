import { Component, OnInit } from '@angular/core';
import { ApplyService } from '../apply.service';

@Component({
	selector: 'app-apply',
	templateUrl: './apply.component.html',
	styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

	applicationForm: any
	invalidAge: any
	invalidId: any
	approvedApp: any
	currentApplicant: any = null

	applicantData = {
		studentid: "",
		firstname: "",
		lastname: "",
		phonenumber: "",
		email: "",
		gender: "",
		date_of_birth: "",
		class_status: "",
		gpa: "",
		current_credits: ""
	}

	dateOfBirth = {
		day: "",
		month: "",
		year: ""
	}


	registrarData: any

	constructor(private _apply: ApplyService) {
		this._apply.getRegistrar().subscribe((data) => {
			this.registrarData = data;
		})
	}

	ngOnInit(): void {

		this.applicationForm = document.querySelector('#applicationForm')
		this.invalidAge = document.querySelector('#invalidAge')
		this.invalidId = document.querySelector('#invalidId')
		this.approvedApp = document.querySelector('#approvedApp')
	}

	sendApplicant() {

		this.applicationForm.style.display = 'none'

		//set the DoB for the applicantData object
		let applicantBirthday = this.dateOfBirth.year.concat('-', this.dateOfBirth.month, '-', this.dateOfBirth.day)
		this.applicantData.date_of_birth = applicantBirthday

		for (let i = 0; i < this.registrarData.length; i++) {
			if (this.applicantData.studentid == this.registrarData[i].studentid) {
				this.currentApplicant = this.registrarData[i]

			}
		}

		//check to see if the student ID entered exists
		if (this.currentApplicant != null) {
	
			console.log(this.currentApplicant)

			if (this.checkAge() > 23 || Number(this.applicantData.current_credits) < 12 || Number(this.applicantData.gpa) < 3.2) {
				this.invalidAge.style.display = 'block'
				console.log("You do not qualify")
				console.log(this.registrarData)
			}
			else {
				this.approvedApp.style.display = 'block'
				console.log("Approved aplication, thank you for applying")
	
				this._apply.addApplicant(this.applicantData)
					.subscribe(
						res => console.log(res),
						err => console.log(err)
					)

			}
		}
		else {
			//If there is no matching student ID respond with an invalid ID message
			this.invalidId.style.display = 'block'
		}

	}

	checkAge() {

		//create date to calculate age
		let birthday = new Date();
		// -1 since months are counted 0-11
		birthday.setFullYear(Number(this.dateOfBirth.year), Number(this.dateOfBirth.month) - 1, Number(this.dateOfBirth.day))

		//get todays date
		let now = new Date();
		var nowMonth = now.getUTCMonth() + 1; //months from 1-12
		var nowDay = now.getUTCDate();
		var nowYear = now.getUTCFullYear();


		var myMonth_birth = birthday.getUTCMonth();
		var myDay_birth = birthday.getUTCDate();
		var myYear_birth = birthday.getUTCFullYear();

		var birthAge = nowYear - myYear_birth - 1;//not ur age yet

		if (nowMonth >= myMonth_birth) {   //means ur birth month is now or passed
			if (nowDay >= myDay_birth)     //check if the day is now or passed
				birthAge += 1;
		}

		return birthAge
	}
}
