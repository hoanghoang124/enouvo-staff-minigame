import { Role } from './role.model';

export class User {
  userId: 'userId';
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: 'token';
  shouldUserChangePassword: 'shouldUserChangePassword';
}
