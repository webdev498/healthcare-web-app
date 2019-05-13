//--------------------------------------------------------------------------------------------------
// Imports Section:
//--------------------------------------------------------------------------------------------------
import { FormControl }   from '@angular/forms';
import { FormGroup }     from '@angular/forms';


//--------------------------------------------------------------------------------------------------
// Validators Library:
//--------------------------------------------------------------------------------------------------
export class ValidatorsLibrary
{
    //----------------------------------------------------------------------------------------------
    // Form Validator Methods Section:
    //----------------------------------------------------------------------------------------------
    public static checkOnlyAlphaValidator(control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkOnlyAlphaValidator: false};
        if (control.value.match(/([A-Za-z0-9])\w+/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkAlphanumericValidator (control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkAlphanumericValidator: false};
        if (control.value.match(/([A-Za-z0-9])\w+/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkPhoneValidator (control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkPhoneValidator: false};
        if (control.value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkPostalCodeValidator (control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkPostalCodeValidator: false};
        if (control.value.match(/\d{5}/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkEmailValidator(control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkEmailValidator: false};
        if (control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkTokenValidator(control: FormControl): { [s: string]: boolean }
    {
        let retVal : any = {checkEmailValidator: false};
        /// TODO: CHANGE THIS FOR A VALID REGULAR EXPRESSION FOR VALIDATING TOKENS...
        if (control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
            retVal = null;
        }
        return retVal;
    }

    //----------------------------------------------------------------------------------------------
    public static checkFieldsAreEqual(group: FormGroup) : { [s: string]: boolean }
    {
        let valid: boolean = true;
        let ctrlNumber: number = 0;
        let ctrlPrevVal: string = '';
        let name: string;

        for (name in group.controls)
        {
            let ctrlCurrentVal: string = group.controls[name].value

            if ((ctrlNumber > 0) && (ctrlCurrentVal != ctrlPrevVal))
            {
                valid = false;
                break;
            }

            ctrlPrevVal = ctrlCurrentVal;
            ctrlNumber++;
        }

        if (valid)
        {
            return null;
        }

        return { areEqual: true };
    }

    //----------------------------------------------------------------------------------------------
    public static checkPasswordFieldsAreEqual(group: FormGroup) : { [s: string]: boolean }
    {
        let valid: boolean = true;
        let PasswordVal: string = group.controls['_txtPassword'].value;
        let ConfirmPasswordVal: string = group.controls['_txtConfirmPassword'].value;

        if (PasswordVal !== ConfirmPasswordVal) { valid = false; }
        if (valid) { return null; }

        return { checkPasswordFieldsAreEqual: true };
    }

}
