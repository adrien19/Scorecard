import { User } from '../models/user.model';
import { Role } from '../../layouts/auth/auth-models/role';


export const USERS: User[] = [
  {
    userId: 'jaisdasruo',
    username: 'adrien.K',
    password: 'user123',
    role: Role.Admin,
    userEmail: 'user1@test.com',
    userFirstName: 'Adrien',
    userLastName: 'K.',
    userfullName: 'adrien K.'
    // canEditCard?: Scorecard[];
    // canViewCard?: Scorecard[];
  },
  {
    userId: 'jashlasjhsd',
    username: 'Mike.D',
    password: 'user123',
    role: Role.User,
    userEmail:'user2@test.com',
    userFirstName: 'Mike',
    userLastName: 'D.',
    userfullName: 'Mike D.'
    // canEditCard?: Scorecard[];
    // canViewCard?: Scorecard[];
  },
  {
    userId: 'asdafggd',
    username: 'Joe.J',
    password: 'user123',
    role: Role.User,
    userEmail: 'user3@test.com',
    userFirstName: 'Joe',
    userLastName: 'J.',
    userfullName: 'Joe J.'
    // canEditCard?: Scorecard[];
    // canViewCard?: Scorecard[];
  },
  {
    userId: 'asdreffas',
    username: 'Jane T.',
    password: 'user123',
    role: Role.User,
    userEmail: 'user4@test.com',
    userFirstName: 'Jane',
    userLastName: 'T.',
    userfullName: 'Jane T.'
    // canEditCard?: Scorecard[];
    // canViewCard?: Scorecard[];
  },
  {
    userId: 'jeffsorndf',
    username: 'Jeff.M',
    password: 'user123',
    role: Role.User,
    userEmail: 'user1@test.com',
    userFirstName: 'Jeff',
    userLastName: 'M.',
    userfullName: 'Jeff M.'
  },
  {
    userId: 'hyusnelfas',
    username: 'John.B',
    password: 'user123',
    role: Role.User,
    userEmail: 'user8@test.com',
    userFirstName: 'John',
    userLastName: 'B.',
    userfullName: 'John B.'
  },
  {
    userId: 'johnshdbasd',
    username: 'John.D',
    password: 'user123',
    role: Role.User,
    userEmail: 'user6@test.com',
    userFirstName: 'John',
    userLastName: 'D.',
    userfullName: 'John D.'
  }
]
