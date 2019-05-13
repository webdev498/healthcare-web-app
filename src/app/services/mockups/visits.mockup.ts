//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { IVisits }              from '../../models/interfaces/visits.interface';

//------------------------
// Data:
//------------------------
export function getVisits()     : IVisits[]
{
    return [
        { 
            Id: 1, 
            DoctorName          : 'Dr. Jennifer Greatdoc', 
            PatientName         : 'José Garza', 
            StartDate           : '2/1/2018 1:22 PM',
            EndDate             : '2/1/2018 1:38 PM',
            ProviderDocStatus   : 'Pending',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 jose Garza',
            ],
            Completed           : true
        },  
        { 
            Id: 2, 
            DoctorName          : 'Dr. Jennifer Greatdoc', 
            PatientName         : 'José Garza', 
            StartDate           : '1/29/2018 4:22 PM',
            EndDate             : '1/29/2018 4:38 PM',
            ProviderDocStatus   : 'Complete',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 jose Garza',
                'Absence Note 012918 Linda Garza'
            ],
            Completed           : true
        },  
        { 
            Id: 3, 
            DoctorName          : 'Dr. Rex Rightteous', 
            PatientName         : 'Linda Garza', 
            StartDate           : '9/05/2018 3:22 PM',
            EndDate             : '9/05/2018 3:38 PM',
            ProviderDocStatus   : 'Complete',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 jose Garza',
                'Absence Note 012918 Linda Garza'
            ],
            Completed           : false
        },  
        { 
            Id: 4, 
            DoctorName          : 'Dr. Jennifer Greatdoc', 
            PatientName         : 'José Garza', 
            StartDate           : '6/14/2018 2:22 PM',
            EndDate             : '6/14/2018 2:38 PM',
            ProviderDocStatus   : 'Complete',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 José Garza',
                'Absence Note 012918 Linda Garza'
            ],
            Completed           : false
        },
        { 
            Id: 5, 
            DoctorName          : 'Dr. Jennifer Greatdoc', 
            PatientName         : 'Jacob Childers', 
            StartDate           : '6/14/2018 2:22 PM',
            EndDate             : '6/14/2018 2:38 PM',
            ProviderDocStatus   : 'Complete',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 Jacob Childers',
                'Absence Note 012918 Linda Childers'
            ],
            Completed           : false
        },  
        { 
            Id: 6, 
            DoctorName          : 'Dr. Jennifer Greatdoc', 
            PatientName         : 'Amy Rodriguez', 
            StartDate           : '6/14/2018 2:22 PM',
            EndDate             : '6/14/2018 2:38 PM',
            ProviderDocStatus   : 'Complete',
            Reasons             : ['Stomach Pain', 'Headache', 'Sniffles'],
            Diagnosis           : ['Flu'],
            Notes               : ['Stomach Pain', 'Headache', 'Sniffles'],
            ReferredTo          : 'Dr. Goodmeds',
            Prescription        : 'None',
            AbsenceNotes        : [
                'Absence Note 012918 Amy Rodriguez',
                'Absence Note 012918 Linda Rodriguez'
            ],
            Completed           : false
        },  
        
    ];
}
