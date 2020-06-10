import { Scorecard, ProjectStatus } from '../models/scorecard-item';
import { USERS } from './users.data';
import { NETWORKS } from './network.data';
import { Role } from '../../layouts/auth/auth-models/role';

export let SCORECARDS: Scorecard[] = [
  {
    id: '1',
    title: 'Communicate to Innovate',
    projectStatus: ProjectStatus.IN_PLANNING,
    status: {
      overall: "Y",
      quality: "G",
      time: "R",
      cost: "G",
    },
    owner: USERS.find( user => {
      if (user.userId === 'jeffsorndf') {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
      }
    }),
    createdBy: USERS.find( user => {
      if (user.userId === 'jaisdasruo') {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
      }
    }),

    primes: {
      principal: [
        {
          userId: 'johnshdbasd',
          userfullName: 'John D.',
          userEmail: 'user6@test.com',
        }
      ],
      secondary: [
        {
        userId: 'jeffsorndf',
        userEmail: 'user1@test.com',
        userfullName: 'Jeff M.'
       }
      ]
    },
    team: [
      {
        title: 'product owners',
        users: USERS.slice(0,2),
      },
      {
        title: 'scrum master',
        users: USERS.slice(2,4),
      },
      {
        title: 'SME',
        users: USERS.slice(4,5),
      },
    ],
    goal: 'The goal of the project is to establish requirements fot the installment. ',
    doneTask: [
      {
        description: 'Goose Mount - installed new equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Kibuye - remove new equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Cyangugu - installed new device',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: true,
        assignedTo: USERS,
      }
    ],
    nextTask: [
      {
        description: 'Mount P. - installed new XTSD equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Corner C. - remove new KSYSH equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      }
    ],
    challenges: [
      'lack of man power',
      'poor infrastructure'
    ],
    milestones: NETWORKS,
    lastUpdated: new Date(),
    lastUpdatedBy: {
      userId: 'asdafggd',
      userEmail: 'user3@test.com',
      userfullName: 'Joe J.'
     }
  },

  {
    id: '2',
    title: 'New Server Installs',
    projectStatus: ProjectStatus.IN_PROGRESS,
    status: {
      overall: "G",
      quality: "Y",
      time: "Y",
      cost: "G",
    },
    published: true,
    owner: USERS.find( user => {
      if (user.userId === 'hyusnelfas') {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
      }
    }),
    createdBy: USERS.find( user => {
      if (user.userId === 'hyusnelfas') {
      return {
        userId: user.userId,
        userfullName: user.userfullName,
        userEmail: user.userEmail
      }
      }
    }),

    primes: {
      principal: [
        {
          userId: 'johnshdbasd',
          userfullName: 'John D.',
          userEmail: 'user6@test.com',
        }
      ],
      secondary: [
        {
        userId: 'jeffsorndf',
        userEmail: 'user1@test.com',
        userfullName: 'Jeff M.'
       }
      ]
    },
    team: [
      {
        title: 'product owners',
        users: USERS.slice(1,2),
      },
      {
        title: 'scrum master',
        users: USERS.slice(2,3),
      },
      {
        title: 'SME',
        users: USERS.slice(0,1),
      },
      {
        title: 'CODERS',
        users: USERS.slice(4,6),
      },

    ],
    goal: 'The goal of the project is to establish requirements fot the installment. ',
    doneTask: [
      {
        description: 'Goose Mount - installed new equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Kibuye - remove new equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Cyangugu - installed new device',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: true,
        assignedTo: USERS,
      }
    ],
    nextTask: [
      {
        description: 'Mount P. - installed new XTSD equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      },
      {
        description: 'Corner C. - remove new KSYSH equipement',
        taskStatus: 'complete',
        createdTime: new Date(),
        assigned: false,
      }
    ],
    challenges: [
      'lack of man power',
      'poor infrastructure'
    ],
    milestones: NETWORKS,
    lastUpdated: new Date(),
    lastUpdatedBy:
      {
        userId: 'jeffsorndf',
        userEmail: 'user1@test.com',
        userfullName: 'Jeff M.'
       }
  }
]
