import { Role } from './role.model';

export class User {
  id: 'id';
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  token: string;
  shouldUserChangePassword: boolean;
}
