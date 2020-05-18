import { RoleId } from './role.model';

export class User {
  id: 'id';
  username: string;
  password: string;
  role: RoleId;
  token: string;
  shouldUserChangePassword: boolean;
}
