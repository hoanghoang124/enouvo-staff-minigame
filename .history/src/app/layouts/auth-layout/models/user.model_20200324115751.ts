import { Role } from "./role.model";

export class User {
  id: "id";
  username: string;
  password: string;
  role: Role;
  token: string;
  shouldUserChangePassword: boolean;
  staff: Staff;
}
