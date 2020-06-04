import { User } from './user.model';

export interface Role {
  title: string;
  users?: User[];
}

export interface PrimeRole extends Role {
  title: string;
  users?: User[];
  primary?: User[];
  secondary?: User[];
}
