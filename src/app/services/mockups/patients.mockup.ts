//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { Patient }            from '../../models/patient.model';

//------------------------
// Data:
//------------------------
export function getPatients(): Patient[]
{
    return [
        new Patient("22","Ana Vela",       "Female", 32, "/assets/images/ana-vela.jpg",       'Family',1, false),
        new Patient("emd-u004","José Garza",     "Male",   34, "/assets/images/Jose-Garza.jpg",     'Family',1, false),        
        new Patient("emd-u006","Amy Rodriguez",  "Female", 36, "/assets/images/Amy-Rodriguez.jpg",  'Family',1, false),
        new Patient("emd-u003","Jeff Martinez",   "Male", 36, "/assets/images/John-Dvorak.jpg",  'Family',1, true),
        new Patient("emd-u001","Jacob Childers",  "Male", 15, "/assets/images/Steve-Cavanaugh.jpg",  'Add-On',1, false),
    ];
}
