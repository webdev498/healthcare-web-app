//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component, OnInit }                from '@angular/core';

//-------------------------------------------------------------------------------
// Angular Forms
//-------------------------------------------------------------------------------
import { FormBuilder, FormControl } 						        	from '@angular/forms';
import { FormGroup } 								        from '@angular/forms';
import { Validators } 							        from '@angular/forms';
import { DialogChangePasswordComponent }    from '../../../../components/Dialogs/dialog-change-password/dialog-change-password.component';
import { DialogUploadPhotoComponent }       from '../../../../components/Dialogs/dialog-upload-photo/dialog-upload-photo.component';


//-------------------------------------------------------------------------------
// Dialogs
//-------------------------------------------------------------------------------
import { MatDialog }                        from '@angular/material';



//---------------------------
// Models
//---------------------------
import * as provmock                        from '../../../../services/mockups/providers.mockup';
import { Provider }                         from '../../../../models/provider.model';
import { ProvidersService } from '../../../../services/providers.service';
import { SecurityService } from '../../../../services/security.service';
import { UserInfoDto } from '../../../../models/interfaces/useraccount/user-info-dto';
import { IProviderInfo } from '../../../../models/interfaces/provider/provider-info.interface';
import { ISpecialtiesDTO } from '../../../../models/interfaces/provider/specialtiesDTO';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  //---------------------------------------------------------------------------
  // Public Fields Section
  //---------------------------------------------------------------------------
  public form				  : FormGroup;
  public providers    : Provider[] = [];
  public provider     : UserInfoDto;
  public providerProf : IProviderInfo;
  public date         : FormControl;
  public dateOb       : FormControl;
  isLoad              : boolean = false;
  selectedGender      : string = "";
  selectedSpeciality  : string = "";
  public linkPicture	: string;
	public timeStamp		: number;

  public genders = [
		{ value: 'F', viewValue: 'Female' },
		{ value: 'M', viewValue: 'Male' },
		{ value: 'other', viewValue: 'Other' },
		{ value: 'decline', viewValue: 'Decline' }
  ];

  public states = [
    {
        value: 'AL',
        viewValue: 'AL'
    },
    {
        value: 'AK',
        viewValue: 'AK'
    },
    {
        value: 'AS',
        viewValue: 'AS'
    },
    {
        value: 'AZ',
        viewValue: 'AZ'
    },
    {
        value: 'AR',
        viewValue: 'AR'
    },
    {
        value: 'CA',
        viewValue: 'CA'
    },
    {
        value: 'CO',
        viewValue: 'CO'
    },
    {
        value: 'CT',
        viewValue: 'CT'
    },
    {
        value: 'DE',
        viewValue: 'DE'
    },
    {
        value: 'DC',
        viewValue: 'DC'
    },
    {
        value: 'FM',
        viewValue: 'FM'
    },
    {
        value: 'FL',
        viewValue: 'FL'
    },
    {
        value: 'GA',
        viewValue: 'GA'
    },
    {
        value: 'GU',
        viewValue: 'GU'
    },
    {
        value: 'HI',
        viewValue: 'HI'
    },
    {
        value: 'ID',
        viewValue: 'ID'
    },
    {
        value: 'IL',
        viewValue: 'IL'
    },
    {
        value: 'IN',
        viewValue: 'IN'
    },
    {
        value: 'IA',
        viewValue: 'IA'
    },
    {
        value: 'KS',
        viewValue: 'KS'
    },
    {
        value: 'KY',
        viewValue: 'KY'
    },
    {
        value: 'LA',
        viewValue: 'LA'
    },
    {
        value: 'ME',
        viewValue: 'ME'
    },
    {
        value: 'MH',
        viewValue: 'MH'
    },
    {
        value: 'MD',
        viewValue: 'MD'
    },
    {
        value: 'MA',
        viewValue: 'MA'
    },
    {
        value: 'MI',
        viewValue: 'MI'
    },
    {
        value: 'MN',
        viewValue: 'MN'
    },
    {
        value: 'MS',
        viewValue: 'MS'
    },
    {
        value: 'MO',
        viewValue: 'MO'
    },
    {
        value: 'MT',
        viewValue: 'MT'
    },
    {
        value: 'NE',
        viewValue: 'NE'
    },
    {
        value: 'NV',
        viewValue: 'NV'
    },
    {
        value: 'NH',
        viewValue: 'NH'
    },
    {
        value: 'NJ',
        viewValue: 'NJ'
    },
    {
        value: 'NM',
        viewValue: 'NM'
    },
    {
        value: 'NY',
        viewValue: 'NY'
    },
    {
        value: 'NC',
        viewValue: 'NC'
    },
    {
        value: 'ND',
        viewValue: 'ND'
    },
    {
        value: 'MP',
        viewValue: 'MP'
    },
    {
        value: 'OH',
        viewValue: 'OH'
    },
    {
        value: 'OK',
        viewValue: 'OK'
    },
    {
        value: 'OR',
        viewValue: 'OR'
    },
    {
        value: 'PW',
        viewValue: 'PW'
    },
    {
        value: 'PA',
        viewValue: 'PA'
    },
    {
        value: 'PR',
        viewValue: 'PR'
    },
    {
        value: 'RI',
        viewValue: 'RI'
    },
    {
        value: 'SC',
        viewValue: 'SC'
    },
    {
        value: 'SD',
        viewValue: 'SD'
    },
    {
        value: 'TN',
        viewValue: 'TN'
    },
    {
        value: 'TX',
        viewValue: 'TX'
    },
    {
        value: 'UT',
        viewValue: 'UT'
    },
    {
        value: 'VT',
        viewValue: 'VT'
    },
    {
        value: 'VI',
        viewValue: 'VI'
    },
    {
        value: 'VA',
        viewValue: 'VA'
    },
    {
        value: 'WA',
        viewValue: 'WA'
    },
    {
        value: 'WV',
        viewValue: 'WV'
    },
    {
        value: 'WI',
        viewValue: 'WI'
    },
    {
        value: 'WY',
        viewValue: 'WY'
    }
  ];
  
  public speciality : ISpecialtiesDTO;
  /*[
		{ value: 'Pediatric', viewValue: 'Pediatric' },
		{ value: 'mamilymedicine', viewValue: 'Family Medicine' },
		{ value: 'neurologist', viewValue: 'Neurologist' },
		{ value: 'cardiologist', viewValue: 'Cardiologist' }
  ];*/

  //---------------------------------------------------------------------------
  // Constructor Method Section
  //---------------------------------------------------------------------------
  constructor(
    private fb    : FormBuilder,
    public dialog : MatDialog,
    private ps    : ProvidersService,
    private ss    : SecurityService,
  ) { }

  ngOnInit() {   
    this.GetProfile();       
    
  }

  //---------------------------------------------------------------------------
	// creating the Form (Michel)
	//---------------------------------------------------------------------------
	createForm() {
		this.form = this.fb.group({			
			'firstName'     : [this.providerProf.FirstName],			
			'lastName'      : [this.providerProf.LastName],		
			'gender'        : [this.providerProf.Gender],
			'phone'         : [this.providerProf.Phone],
			'email'         : [this.providerProf.Email],
      'addresLine1'   : [this.providerProf.Street1],
      'addresLine2'   : [this.providerProf.Street2],
      'city'          : [this.providerProf.City],
      'state'         : [this.providerProf.State],
      'zip'           : [this.providerProf.Zip],
      'education'     : [this.providerProf.MedicalSchool],
      'degree'        : [this.providerProf.Degree,],
      'graduationdate': [this.date.value],
      'speciality'    : [this.providerProf.SpecialtyName],
      'notes'         : [this.providerProf.Notes],

		});
  }
  GetProfile()
  {
    this.provider             = this.ss.getCurrentUserApi();  
    
    this.selectedGender       = this.provider.Gender;
    this.selectedSpeciality   = this.provider.Specialty; 
    this.ps.getProfile(this.provider.ProviderID).subscribe(resp=>{
      console.log(resp);
      this.linkPicture = resp.Photo;
      
      this.providerProf       = resp;
      this.date               = new FormControl(new Date(resp.GraduationDate)); 
      this.dateOb             = new FormControl(new Date(resp.DOB));
     // this.form.controls['gender'].setValue(resp.Gender);
      this.GetSpecialties();    
         
            
    });        
  }
  GetSpecialties()
  {
    this.ps.GetSpecialties().subscribe(resp =>{
        this.speciality = resp;
        this.createForm();  
        this.isLoad             = true;        
        
    })
  }
  
  onSubmit()
  {
    this.providerProf.FirstName     = this.form.value.firstName;
    this.providerProf.LastName      = this.form.value.lastName;
    this.providerProf.Degree        = this.form.value.degree;
    this.providerProf.Notes         = this.form.value.notes;
    this.providerProf.SpecialtyName = this.form.value.speciality;
    this.providerProf.Email         = this.form.value.email;
    this.providerProf.Gender        = this.form.value.gender;
    this.providerProf.MedicalSchool = this.form.value.education;
    this.providerProf.City          = this.form.value.city;
    this.providerProf.State         = this.form.value.state;
    this.providerProf.Street1       = this.form.value.addresLine1;
    this.providerProf.Street2       = this.form.value.addresLine2;
    this.providerProf.Phone         = this.form.value.phone;
    this.providerProf.GraduationDate= this.getDateString(this.form.value.graduationdate);

    console.log(this.providerProf);
    this.ps.updateProfile(this.providerProf).subscribe(resp=>{
      console.log(resp);
      this.GetProfile();
      
    });
  }
  onChangePassword()
  {
    let dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '750px',
      data:{isPatient:false}      
                            
      });
      dialogRef.afterClosed().subscribe((result) => {
        
          
      });  
    
  }
  cmdUpdatePhoto_click()
	{
		let dialogRef = this.dialog.open(DialogUploadPhotoComponent, {
			data: {
				providerID: this.providerProf.ProviderID
			},
			width : "550px",
			});
			dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          console.log(result);		
          this.setLinkPicture(result);							
				}
			});
  }
  public getLinkPicture() {
		if(this.timeStamp) {
		   return this.linkPicture + '?' + this.timeStamp;
		}
		return this.linkPicture;
	}
	
	public setLinkPicture(url: string) {
		this.linkPicture = url;
		this.timeStamp = (new Date()).getTime();
    }

  getDateString(date : any) : string
  {
      let year = date.getFullYear(); //this will give you full year eg : 1990
      let day = date.getDate(); //gives you the date from 1 to 31
      let month = date.getMonth() + 1;
      return month.toString() + "/" + day.toString() + "/" + year.toString();
  }

}
