//-------------------------------------------------------------------------------
// Imports Section
//-------------------------------------------------------------------------------
//------------------------
// Models
//------------------------
import { User }               from '../../models/user.model';
import { enumUserRole }       from '../../models/enums/enumUserRole';

//------------------------
// Data:
//------------------------
export function getUsers(): User[]
{
    return [
        new User(
            'emd-u001',
            'Jacob Childers',
            '/assets/images/jacob-childers-md.jpg',
            'steve@gmail.com',
            'testPass1$',
            '',
            enumUserRole.Provider,
            'Active',
        ),
        new User(
            'emd-u002',
            'Taylor Connors',
            '/assets/images/Jose-Garza.jpg',
            'taylor@gmail.com',
            'testPass',
            '',
            enumUserRole.Both,
            'Active',
        ),
        new User(
            'emd-u003',
            'Jeff Martinez',
            '/assets/images/Jose-Garza.jpg',
            'jeff@gmail.com',
            'testpass',
            '',
            enumUserRole.Both,
            'Active',
        ),
        new User(
            'emd-u004',
            'José Garza',
            '/assets/images/Jose-Garza.jpg',
            'jgarza@vertex.com',
            'testPass',
            '',
            enumUserRole.Patient,
            'Active',
        ),
        new User(
            'emd-u005',
            'Ana Vela',
            '/assets/images/ana-vela.jpg',
            'anavela@gmail.com',
            'testPass1$',
            '',
            enumUserRole.Patient,
            'Active',
        ),
        new User(
            'emd-u006',
            'Amy Rodriguez',
            '/assets/images/Amy-Rodriguez.jpg',
            'amy.rodriguez@gmail',
            'testPass',
            '',
            enumUserRole.Patient,
            'Active',
        )
    ];
}
