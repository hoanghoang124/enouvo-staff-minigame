import { Role } from './role.model';

export class User {
  id: 'id';
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: 'token';
}
