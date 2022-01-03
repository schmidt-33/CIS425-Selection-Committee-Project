import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import { ApplyService } from '../apply.service';

@Component({
	selector: 'app-committee',
	templateUrl: './committee.component.html',
	styleUrls: ['./committee.component.css']
})
export class CommitteeComponent implements OnInit {

	winnerBox: any 
	applicantList: any
	registrarData: any
	winner: any = []
	winnerInfo = {
		studentid: "",
		firstname: "",
		lastname: "",
		amount: ""
	}
	

	constructor(private _committee: ApplyService) {

	}

	ngOnInit(): void {

		this.winnerBox = document.querySelector('#winnerBox')

		this._committee.getApplicants().subscribe((data) => {
			this.applicantList = data;
		})

		this._committee.getRegistrar().subscribe((data) => {
			this.registrarData = data;
		})
	}

	selectWinner() {
		let maxGPA: number= 0
		let applicant: any
		

		// find highest GPA out of all applicants
		for(let i =0; i < this.applicantList.length; i++) {

			applicant = this.applicantList[i]
			
			if(applicant.gpa > maxGPA) {
				maxGPA = applicant.gpa
			}
		}

		//find all the applicant with the max GPA and put them in the winner array (if there is more than 1)
		for(let i =0; i < this.applicantList.length; i++) {
			if( Number(this.applicantList[i].gpa) == maxGPA) {
				this.winner.push(this.applicantList[i])
			}
		}

		// if there is more than one person with highest GPA we need to go further in the decision rules
		if(this.winner.length > 1) {
			for(let i = 0; i < this.winner.length; i++) {
				if (String(this.winner[i].class_status) != 'Junior') {
					this.winner.splice(i, 1)
				}
			}
		}
		// if there is more than one person left we need to go further in the decision rules
		if(this.winner.length > 1) {
			for(let i = 0; i < this.winner.length; i++) {
				if (String(this.winner[i].class_status) != 'Female') {
					this.winner.splice(i, 1)
				}
			}
			
		}
		console.log(this.winner)
		//this.winnerInfo.studentId = this.winner[0].studentid
		this.winnerInfo.studentid = this.winner[0].studentid
		this.winnerInfo.firstname = this.winner[0].firstname
		this.winnerInfo.lastname = this.winner[0].lastname
		console.log(this.winnerInfo)
		console.log(this.registrarData)

		//assing bill from registrat to winner info to send to award store
		for(let i = 0; i < this.registrarData.length; i++) {
			if(this.registrarData[i].studentid == this.winnerInfo.studentid) {
				this.winnerInfo.amount = this.registrarData[i].bill
			}
		}
		
		this._committee.addAwarded(this.winnerInfo).subscribe(
			res => console.log(res),
			err => console.log(err)
		)
		
		this.winnerBox.style.display = "block"


	}

}
