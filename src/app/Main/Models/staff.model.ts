import { User } from '../../Auth/Models/user.model';

export interface Staff {
  userId: User['id'];
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
