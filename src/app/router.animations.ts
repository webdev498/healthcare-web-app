//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//---------------------------
// Libraries
//---------------------------
import { trigger }         from '@angular/animations';
import { animate }         from '@angular/animations';
import { style }           from '@angular/animations';
import { group }           from '@angular/animations';
import { animateChild }    from '@angular/animations';
import { query }           from '@angular/animations';
import { stagger }         from '@angular/animations';
import { transition }      from '@angular/animations';

//-------------------------------------------------------------------------------
// Animation Definitions Section
//-------------------------------------------------------------------------------
export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [

        query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),

        group([
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),

            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.4s ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 })),
            ], { optional: true }),
        ])
    ])
]);
