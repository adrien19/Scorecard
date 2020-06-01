import { User } from './user.model';

export interface Role {
  title: string;
  users?: User[];
}

export class PrimeRole implements Role {
  title: string;
  users?: User[];
  primary: User;
  secondary: User[];
}
