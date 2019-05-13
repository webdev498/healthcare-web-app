//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { Plan }            from '../../models/interfaces/plan.interface';

//------------------------
// Data:
//------------------------
export function getPlans(): Plan[]
{
    return [
        { 
            id: 1, 
            name: '72-Hours One Time Use', 
            price: 40, 
            otherPrice: 0,
            description: 'Connect with a doctor for one-time visit. Select this option and pay $40 for up to 72hrs of access to physician care.',
            codesPromotional : [
                'FirstMonthFree',
                'SecondMonthMiddle'
            ]
        },  
        { 
            id: 2, 
            name: 'Individual', 
            price: 9.95,
            otherPrice: 0, 
            description: 'Connect with a doctor through an individual monthly subscription. Select this option and pay $9.95 for one adult and get up to 10 visits a month.',
            codesPromotional : [
                'FirstMonthFree1',
                'SecondMonthMiddle1'
            ]
        },        
        { 
            id: 3, 
            name: 'Family', 
            price: 19.95, 
            otherPrice: 4.95,
            description: 'Connect with a doctor through our family monthly subscription. Select this option and pay $19.95 for up to four family members and up to 20 visits a month.',
            codesPromotional : [
                'FirstMonthFree2',
                'SecondMonthMiddle2'
            ]
        },
    ];
}
