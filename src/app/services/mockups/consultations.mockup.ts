//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { Consultation }       from '../../models/consultation.model';
import { Patient }            from '../../models/patient.model';

//------------------------
// Data:
//------------------------
export function getConsultations(): Consultation[]
{
    return [
        new Consultation(
            "emc-c0001",
            new Patient("emd-u004","José Garza",     "Male",   34, "/assets/images/Jose-Garza.jpg", 'personal',1, false),
            "flu",
            "Got the flu, but I am coughing a lot."
        ),
        new Consultation(
            "emc-c0002",
            new Patient("emd-u005","Jacob Childers",    "Male",   58, "/assets/images/jacob-childers-md.jpg", 'family',1, false),
            "headache",
            "feels like a migraine"
        ),
        new Consultation(
            "emc-c0003",
            new Patient("emd-u006","Amy Rodriguez",  "Female", 36, "/assets/images/Amy-Rodriguez.jpg", 'personal',1, false),
            "ear pain",
            "started this morning and it is horrible"
        )
    ];
}
