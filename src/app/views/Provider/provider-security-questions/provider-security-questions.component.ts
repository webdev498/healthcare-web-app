import { Component, OnInit }    from '@angular/core';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder, FormControl } 					from '@angular/forms';
import { FormGroup   } 					from '@angular/forms';
import { Validators  } 					from '@angular/forms';
import { FormArray   }          from '@angular/forms';

import { MatSnackBar } 					from "@angular/material/snack-bar";


//---------------------------
// Services
//---------------------------
import { UserService }          from '../../../services/user.service';

//---------------------------
// Router
//---------------------------
import { Router }							from '@angular/router';


//---------------------------
// Models
//---------------------------
import { SecurityQuestion }     from '../../../models/interfaces/securityQuestion.interface';
import { ProvidersService } from '../../../services/providers.service';
import { IProviderPreferences } from '../../../models/interfaces/provider/provider-preferences.interface';
import { SecurityService } from '../../../services/security.service';
import { count } from 'rxjs/operators';
import { IProviderSecurityQuestion } from '../../../models/interfaces/provider/provider-security-question.interface';

export interface IQuestionAnswer{
  ID            : number;
  QuestionText  : string;
  AnswerText    : string;
};

//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-security-questions',
  templateUrl: './provider-security-questions.component.html',
  styleUrls: ['./provider-security-questions.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
 
export class ProviderSecurityQuestionsComponent implements OnInit {
  public preference       : IProviderPreferences;
  public isLoad           : boolean = false;
  public notification     : string;
  public phone            : string = "";
  public email            : string = "";
  public selectePreferece : string;
  public checkedEMail     : boolean = false;
  public checkedPhone     : boolean = false;
  

  public alerts = [
    {value: '0',  viewValue: 'Never'},
    {value: '1',   viewValue: 'Once'},
    {value: '2',  viewValue: 'Twice'},
    {value: '3', viewValue: '3 Times'},
    {value: '4', viewValue: '4 Times'},
    {value: '5', viewValue: '5 Times'},
  ];
 
  public ageRange: number[] = [];

  public listSecurity   : SecurityQuestion[];
  public questionAnswer : IQuestionAnswer[] = [];

  public form					  : FormGroup;
  public questionsCount = 0;
  public textMessage    : string = "";
  public questions;
  public titleAlert			: string = 'This field is required';
  public control        : FormControl

  //---------------------------------------------------------------------------
  // Constructor Method Section
  //---------------------------------------------------------------------------
  constructor(
    private fb				        : FormBuilder,
    private userService			  : UserService,
    private ps                : ProvidersService,
    private ss                : SecurityService,
    private snackBarService   :MatSnackBar    
  ) {
      
  }

  ngOnInit() {
    for(var i=0;i<101;i++)
    {
      this.ageRange.push(i);
    }    
    this.getQuestions();
    this.textMessage = "";
    
    this.GetPreference();
  }
  
  //---------------------------------------------------------------------------
  // Event Handler Methods Section
  //---------------------------------------------------------------------------
  public createForm()
  {
    this.form = this.fb.group({
      'alert'     : [this.preference.RepeatAlerts],
      'questions' : this.fb.array([]),
      'email'     : [this.preference.Email],
      'maxAge'    : [this.preference.MaxAge],
      'minAge'    : [this.preference.MinAge],
      'phone'     : [this.preference.Phone],   
    })
  }
  createQuestion(): FormGroup {
    return this.fb.group({
        'name': ''

    });
}
  get question() {
    return this.form.get('questions') as FormArray;
  }
  addQuestions(quest:any) {    
   this.question.push(this.fb.control({value:quest.AnswerText,placeholder:quest.QuestionText}));
  } 
  
  public GetPreference()
  {
   // let user = this.ss.getCurrentUserApi();
    this.ss.GetUserInfo('false').subscribe(respProv =>{
      this.ps.getPreferences(respProv.ProviderID).subscribe(resp=>{
        this.preference = resp;
        console.log(resp);
        this.email = resp.Email;
        this.phone = resp.Phone;
        this.createForm();
        let questions = this.preference.SecurityQuestionAnswer;
        this.questionAnswer = [];

        if(resp.NotificationPreference == 'by email')
        {
          console.log(resp.NotificationPreference);          
          this.checkedEMail = true;
        }  
        if(resp.NotificationPreference == 'by text')
        {
          console.log(resp.NotificationPreference);
          this.checkedPhone = true;
        } 

        
        questions.forEach(quest => {         
         let q = this.listSecurity.find(x=> x.ID == quest.QuestionID);
         if(q != undefined && q != null)
         {
           let qA:IQuestionAnswer =
           {
             ID : q.ID,
             QuestionText : q.QuestionText,
             AnswerText : quest.AnswerText
           }
           this.questionAnswer.push(qA);
         }
          /*this.question.push(this.fb.group({
           'question': quest.QuestionText,
           
          }))*/
        });
        this.listSecurity.forEach(security =>{
          let sq = this.questionAnswer.find(x=>x.ID == security.ID);
          if(sq == undefined || sq == null)
          {
            let qAA:IQuestionAnswer =
           {
             ID : security.ID,
             QuestionText : security.QuestionText,
             AnswerText : ""
           }
           this.questionAnswer.push(qAA);
          }
        });
        this.questionAnswer.forEach(questA =>{
          this.addQuestions(questA);
        })
        console.log(this.questionAnswer);
        
               
/*questions.forEach(element => {
          this.addQuestions()
        });*/
        
        
        this.isLoad = true;
      })
    })
    
  }
  
  public questionsLength()
	{
		return this.questions.length;
  }
  
  public getQuestions()
	{
		this.ss.SecurityQuestions()
		.subscribe(resp =>{
      this.listSecurity = resp;
      console.log('questions ' , resp);
      
		})
  }

  public questionValidate(ev)
	{
		this.textMessage = "";
		if(ev.target.value != "")this.questionsCount++;
  }
  changeEmail()
  {
    this.checkedEMail = true;
    this.checkedPhone = false;    
  }
  changePhone()
  {
    this.checkedEMail = false;
    this.checkedPhone = true;    
  }

  onSubmit()
  {   
   if(this.checkedEMail)
   {      
     this.preference.NotificationPreference = 'by email';  
   }
   if(this.checkedPhone)
   {       
     this.preference.NotificationPreference = 'by text';   
   }
        
   let questionForm = this.form.value.questions
   let count = this.questionAnswer.length;  
   
   console.log(questionForm);   
   this.preference.SecurityQuestionAnswer = [];
   
   for(let i = 0; i < count ; i++)
   {
      let providerSQ : IProviderSecurityQuestion = {
        UserID: +localStorage.getItem('userid'),
        QuestionID: this.questionAnswer[i].ID,
        QuestionText: this.questionAnswer[i].QuestionText,
        AnswerText  : questionForm[i].value != undefined ?questionForm[i].value :questionForm[i]

      }
      this.preference.SecurityQuestionAnswer.push(providerSQ);    
   }    

    this.preference.MinAge        = this.form.value.minAge;
    this.preference.MaxAge        = this.form.value.maxAge;
    this.preference.RepeatAlerts  = this.form.value.alert;
    
    if(this.form.value.minAge > this.form.value.maxAge)
    {
      alert('min age can’t be larger than max age ');
      return;
    }
    if(this.form.value.minAge == undefined )
    {
      alert('please select a min age ');
      return;
    }
    if(  this.form.value.maxAge == undefined)
    {
      alert('please select a max age ');
      return;
    }
    
    this.ps.updatePreferences(this.preference).subscribe(resp => {    
      
      this.snackBarService.open( resp.Message, undefined, {duration: 2000} );
      this.GetPreference();      
    })
    
    
  }

}
