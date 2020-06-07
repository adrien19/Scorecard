import { User } from './user.model';

export interface ProjectRole {
  title: string;
  users?: User[];
}

export interface PrimeRole extends ProjectRole {
  title: string;
  users?: User[];
  primary?: User[];
  secondary?: User[];
}
