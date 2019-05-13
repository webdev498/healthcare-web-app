//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { Provider }            from '../../models/provider.model';

//------------------------
// Data:
//------------------------
export function getProviders(): Provider[]
{
    return [
        new Provider("23","Jacob Childers",  "Family Medicine", 4.5, "/assets/images/jacob-childers-md.jpg", "Doctor of Medicine", "The University of Texas Medical School at Houston, 2002" , "I chose Family Medicine because I love the challenging variety, as well as the opportunity to touch lives in multiple ways. Each day brings new challenges and personalities, and is therefore never dull or monotonous. With Urgent Care medicine, I find that I really enjoy the opportunity to help fix whatever pressing need the patient brings to me."),
        new Provider("emd-u002","Taylor Connors",   "Neurologist",  4.5, "/assets/images/Jose-Garza.jpg", "Doctor of Medicine", "University of Texas, 1991" , "I have a specialty in neurology."),
        new Provider("emd-u003","Jeff Martinez",    "Cardiologist", 4.5, "/assets/images/Jose-Garza.jpg", "Doctor of Medicine", "University of Oxford, 1990" , "I have a specialty in Cardiologist."),
        new Provider("22","Ana Vela",    "Dermatologist", 4.5, "/assets/images/ana-vela.jpg", "Doctor of Medicine", "University of Oxford, 1990" , "I have a specialty in Dermatologist.")
    ];
}
