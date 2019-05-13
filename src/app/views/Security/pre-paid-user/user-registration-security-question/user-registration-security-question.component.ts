//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component } 				from '@angular/core';
import { OnInit } 					from '@angular/core';

//---------------------------
// Router
//---------------------------

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder, FormControl } 				from '@angular/forms';
import { FormGroup } 				from '@angular/forms';
import { FormArray } 				from '@angular/forms';
import { Validators } 				from '@angular/forms';

//---------------------------
// Router
//---------------------------
import { Router }					from '@angular/router';
import { ActivatedRoute }			from '@angular/router';

//---------------------------
// Services
//---------------------------
import { SecurityService }      	from '../../../../services/security.service';

//---------------------------
// Interface
//---------------------------
import { SecurityQuestion } 		from '../../../../models/interfaces/securityQuestion.interface';
import { SecurityQuestionAnswerDTO }from '../../../../models/interfaces/securityquestion/security-question-answer.interface';
import { UserSecurityQuestionsDTO } from '../../../../models/interfaces/securityquestion/user-security-questionsDTO';


//-------------------------------------------------------------------------------
// Component Declaration Section
// tslint:disable-next-line:comment-format
//-------------------------------------------------------------------------------
@Component({
	templateUrl: './user-registration-security-question.component.html',
	selector: 'app-user-registration-security-question',
	styleUrls: ['./user-registration-security-question.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class UserRegistrationSecurityQuestionComponent implements OnInit {
	//---------------------------------------------------------------------------
	// Public Fields Section
	//---------------------------------------------------------------------------
	public _userRegSecQuestForm	: FormGroup;
	public questions	        : SecurityQuestion[];
	public questionsCount 		: number = 0;
	public textMessage			: string;
	public patientID			: number;

	public error				: string;
	public showError			: boolean = false;

	//---------------------------------------------------------------------------
	// Private Fields Section
	//---------------------------------------------------------------------------
	private fb					: FormBuilder;

	//---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
	constructor(
		fb: FormBuilder,
		private route : Router,
		private rt: ActivatedRoute,
		private ss: SecurityService,
	) {
		// Services
		this.fb 			= fb;

		// Form Configuration
		this.createForm();
	}
	//---------------------------------------------------------------------------
	// LifeCycle Handlers
	//---------------------------------------------------------------------------
	ngOnInit() {
		this.patientID = JSON.parse(localStorage.getItem("NewUser")).PatientID;
		console.log(this.patientID);
		
		
		this.ss.SecurityQuestions().subscribe(resp => {
			this.questions = resp;
			
			this.createForm();

			this.questions.forEach(function(value){
				this.question.push(this.fb.control(
					{
						value: "", 
						placeholder: value.QuestionText, 
						id:value.ID
					}));
			},this)
		})
	}

	//---------------------------------------------------------------------------
	// creating the Form
	//---------------------------------------------------------------------------
	createForm() 
	{
		this._userRegSecQuestForm = this.fb.group({
			question: this.fb.array([])
		});
	}

	get question() {
		return this._userRegSecQuestForm.get('question') as FormArray;
	}

	




	//---------------------------------------------------------------------------
	// Get Questions Length
	//---------------------------------------------------------------------------
	questionsLength()
	{
		return this.questions.length;
	}

	cmdRegisterUser_click()
	{	
		let answers = this._userRegSecQuestForm.value.question;
		let answersAPI : SecurityQuestionAnswerDTO[] = [];
		
		for(let i = 0; i < answers.length ; i++)
		{
			let temp : SecurityQuestionAnswerDTO = {
				QuestionID 	: this.questions[i].ID,
    			Answer      : ((typeof answers[i]) == "string") ? answers[i] : ""
			};
			answersAPI[i] = temp
			
		}

		if(this.questionsCount >= 3){
			let answers : UserSecurityQuestionsDTO = {
				PatientID   : this.patientID,
    			Answers     : answersAPI
			}

			console.log(answers);

			this.ss.RegistrationStep2(answers).subscribe(resp => {
				console.log(resp);
				
				if(resp.Message == "Success"){
					localStorage.setItem("answers", JSON.stringify(answers));
					
					this.route.navigate(
						[
							'security/pre-paid/verify-account'
						]
					); 
				}else{
					this.error = resp.Message;
					this.showError = true;
				}
			})
			

			
		}else{
			this.error = "You have to answer at least 3 questions."
			this.showError = true;
		}
	}

	onPrevious()
	{
        //this.routerService.navigate(['/security/pre-paid/user-registration-1']); 
	}

	questionValidate(ev)
	{
		this.textMessage = "";
		if(ev.target.value != "")this.questionsCount++;
	}
}
