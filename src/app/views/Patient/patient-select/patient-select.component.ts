//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { Component }         from '@angular/core';
import { OnInit }            from '@angular/core';

//---------------------------
// Router
//---------------------------
import { Router }            from '@angular/router';
import { ActivatedRoute }    from '@angular/router';

//---------------------------
// Angular Forms
//---------------------------
import { FormBuilder }       from '@angular/forms';
import { FormGroup }         from '@angular/forms';
import { Validators }        from '@angular/forms';

//---------------------------
// Services
//---------------------------
import { SecurityService }   from '../../../services/security.service';
import { GlobalsService }    from '../../../core/services/globals.service';
import { LogService }        from '../../../core/services/log.service';
import { VisitService }      from '../../../services/visit.service';


//---------------------------
// Models
//---------------------------
import { PatientIdName }     from '../../../models/interfaces/visits/patient-id-name.interface';


//-------------------------------------------------------------------------------
// Component Declaration Section
//-------------------------------------------------------------------------------
@Component({
  selector: 'app-patient-select',
  templateUrl: './patient-select.component.html',
  styleUrls: ['./patient-select.component.css']
})
//-------------------------------------------------------------------------------
// Component Class Section
//-------------------------------------------------------------------------------
export class PatientSelectComponent implements OnInit
{
    //---------------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------------
    public form            : FormGroup;
    public patients        : PatientIdName[] = [];
    public adults          : PatientIdName[] = [];
    public isLoaded        : boolean = false;

    public membership      : boolean;

    //---------------------------------------------------------------------------
    // Private Fields Section
    //---------------------------------------------------------------------------
    private routerService   : Router;
    
    private securityService : SecurityService;
    private visitService    : VisitService;
    private globalsService  : GlobalsService;
    private fb              : FormBuilder;



    //---------------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------------
    constructor(
      fb: FormBuilder,
      rt: Router,
      ls: LogService,
      vs: VisitService,
      ss: SecurityService,
      private route: ActivatedRoute,
    )
    {
        // Services
        this.routerService   = rt;
        this.globalsService  = GlobalsService.getInstance();
        this.visitService    = vs;
        this.securityService = ss;
        this.fb              = fb;
    }


    //---------------------------------------------------------------------------
    // LifeCycle Handlers
    //---------------------------------------------------------------------------
    ngOnInit()
    {
        if (this.securityService.isUserAuthenticated())
        {
            this.visitService.PatientStartVisitStep1().subscribe(resp =>{
                this.patients = resp.patients; 
                this.adults = resp.adults; 
                console.log(resp);

                this.isLoaded = true;
                
            });

            // Form Configuration
            this.createForm();

            /*if(!this.membership)
            {
                this.form.controls['adult'].setErrors({ isRequired: false });
                //this.form.controls['adult'].setErrors(null);
               // this.form.controls.adult.disable();
            }*/
        }
    }

    //---------------------------------------------------------------------------
    // creating the Form (Michel)
    //---------------------------------------------------------------------------
    createForm()
    {
        this.form  = this.fb.group({

            'patient'   : ['', Validators.compose([Validators.required ])],
            'adult'     : ['', Validators.compose([ ])],
            'read'      : ['', Validators.compose([Validators.required ])],
        });

        this.form.controls["adult"].disable();
    }
        
    onSubmit()
    {
        let adultID = (this.form.value.adult) ? this.form.value.adult : 0
        
        this.routerService.navigate(
            [
              '/home/patient-home/patient-medical-info-read/',
              this.form.value.patient,
              adultID
            ]
        );
    }


    //---------------------------------------------------------------------------
    // Event Handler Methods Section
    //---------------------------------------------------------------------------
    ChangeButton_click(value : boolean)
    {
        if(value === false){
            this.form.setErrors(['Checkbox is required']);
        }
    }

    selectPatient(PatientID : number)
    {
        this.form.controls["adult"].enable();
        this.form.controls["adult"].setErrors(["Adult is required"]);

        this.adults.forEach(function (value) {
            if(value.PatientID == PatientID){
                this.form.controls["adult"].reset();
                this.form.controls["adult"].disable();
                this.form.controls["adult"].setErrors([]);
                return;
            }
          },this); 
    }
}
