<<<<<<< HEAD
export class Staff {
=======
import { User } from '../../Auth/Models/user.model';

export interface Staff {
  userId: User['id'];
>>>>>>> parent of 7452362... * config to deploy
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string;
  email: string;
  quote: string;
  birthday: string;
  phone: number;
  addressStreet: string;
  addressCity: string;
  position: string;
}
