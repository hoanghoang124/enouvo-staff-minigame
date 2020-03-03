import { Role } from './enum-type';

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: 'token';
}
