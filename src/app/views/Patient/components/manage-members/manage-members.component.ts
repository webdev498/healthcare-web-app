//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Libraries
//-------------------------------------------------------------------------------
import { Component, OnInit } 						from '@angular/core';

//-------------------------------------------------------------------------------
// Router
//-------------------------------------------------------------------------------
import { Router } 									from '@angular/router';

//-------------------------------------------------------------------------------
// Angular Material
//-------------------------------------------------------------------------------
import { MatDialog } 	from '@angular/material';

//-------------------------------------------------------------------------------
// Services
//-------------------------------------------------------------------------------
import { UserService } 								from '../../../../services/user.service';
import { PatientsService } 							from '../../../../services/patients.service';

//-------------------------------------------------------------------------------
// Dialogs
//-------------------------------------------------------------------------------
import { DialogAddFamilyMemberComponent } 			from '../../../../components/Dialogs/dialog-add-family-member/dialog-add-family-member.component';

//-------------------------------------------------------------------------------
// Models
//-------------------------------------------------------------------------------
import { IFamilyMember } 							from '../../../../models/interfaces/patient/familymember.interface';
import { ISubscriptionInfo } 						from '../../../../models/interfaces/patient/subscriptioninfo.interface';
import { DialogAmountSlotMembersComponent } from '../../../../components/Dialogs/dialog-amount-slot-members/dialog-amount-slot-members.component';
import { SecurityService } from '../../../../services/security.service';


@Component({
	selector: 'app-manage-members',
	templateUrl: './manage-members.component.html',
	styleUrls: ['./manage-members.component.scss']
})

//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class ManageMembersComponent implements OnInit {
	public isLoaded			: boolean = false;
	public patients			: IFamilyMember[];
	public patientPrimary	: IFamilyMember;
	public paymentPlan		: string;
	public subscriptionInfo	: ISubscriptionInfo
	public numberPatients	: number;
	public isPrepay			: boolean;

	//---------------------------------------------------------------------------
	// Constructor Method Section
	//---------------------------------------------------------------------------
	constructor(
		private rt		: Router,
		public dialog	: MatDialog,
		public ps     	: PatientsService,
		public ss		: SecurityService
	) {
		
	}

	ngOnInit() 
	{
		this.getFamilyList();
	}

	//---------------------------------------------------------------------------
	// Public Methods
	//---------------------------------------------------------------------------
	getFamilyList()
	{
		this.ps.GetSubscriptionInfo().subscribe(resp => {
			console.log(resp);
			this.subscriptionInfo = resp;

			this.ps.GetFamilyMemberList().subscribe(resp=>{
				this.patients = resp;
				console.log(resp);
				this.numberPatients = 4 - (this.patients.length - 1);
				this.numberPatients = (this.numberPatients < 0) ? 0: this.numberPatients;
				
				let pat = this.patients.find(x=> x.IsPrimary);
				this.patientPrimary = pat;
				console.log(pat);
				
	
				this.isLoaded = true;
			});
			},
			(error) => {
			}
		);

		this.ss.GetUserInfo('true').subscribe(resp =>{
			this.isPrepay = resp.IsPrepay;  
			console.log(this.isPrepay);
			console.log(resp);
			
			          
        })
	}

	isDisableButtonAdd() {

		if (this.subscriptionInfo.CanAddFamilyMembers ) {
			return false;
		} else {
			return true;
		}
	}

	addFamilyMember() {
		console.log(this.numberPatients);
		
		if(this.numberPatients != 0){
			let dialogRef = this.dialog.open(DialogAmountSlotMembersComponent, {
				data:{
                    amountMembers: this.numberPatients
                },
				width: "750px",
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result != undefined) {
					this.rt.navigate(['home/patient-home/patient-add-family-members/',
						{
							membersAmount: this.numberPatients,
						}]
					);
				}
			});
		}else{
			let dialogRef = this.dialog.open(DialogAddFamilyMemberComponent, {
				width: "750px",
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result != undefined) {
					this.rt.navigate(['home/patient-home/patient-add-family-members/',
						{
							membersAmount: this.patients.length,
						}]
					);
				}
			});
		}
		
	}
	
	getColor(member: IFamilyMember) {
		if (member.IsPrimary ) {
			return 'lightgray'
		}
		if (!member.IsActive) {
			return 'gray'
		}
	}

	manageSubscription(row) {
		if (!row.IsPrimary) {
			let tabIndex = localStorage.getItem("tabIndex");

			this.rt.navigate([
				'/home/patient-home/patient-myaccount-tab/'+tabIndex+'/patient-manage-subscription',
				row.DisplayName,
				row.PatientID,
				this.patientPrimary.PatientID,
				row.IsPrivate,
				row.IsActive
			])
		}

	}
}
