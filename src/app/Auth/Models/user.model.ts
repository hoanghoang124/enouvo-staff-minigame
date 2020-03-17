import { Role } from './role.model';
import { Staff } from 'src/app/Main/Models/staff.model';

export class User {
  id: 'id';
  username: string;
  password: string;
  role: Role;
  token: string;
  shouldUserChangePassword: boolean;
  staff: Staff;
}
