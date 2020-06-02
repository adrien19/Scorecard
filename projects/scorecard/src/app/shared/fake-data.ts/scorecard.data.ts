import { Scorecard, ProjectStatus } from '../models/scorecard-item';
import { USERS } from './users.data';
import { NETWORKS } from './network.data';

export const SCORECARDS: Scorecard[] = [
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
    owner: {
      userId: 'jeffsorndf',
      userLoginId: 'Jeff.M',
      userEmail: 'user1@test.com',
      userFirstName: 'Jeff',
      userLastName: 'M.',
      userfullName: 'Jeff M.'
    },
    primes: {
      principal: [],
      secondary: []
    },
    team: [
      {
        title: 'product owners',
        users: USERS,
      },
      {
        title: 'scrum master',
        users: USERS,
      },
      {
        title: 'SME',
        users: USERS,
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
      userId: 'jeffsorndf',
      userLoginId: 'Jeff.M',
      userEmail: 'user1@test.com',
      userFirstName: 'Jeff',
      userLastName: 'M.',
      userfullName: 'Jeff M.'
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
    owner: {
      userId: 'jeffsorndf',
      userLoginId: 'Jeff.M',
      userEmail: 'user1@test.com',
      userFirstName: 'Jeff',
      userLastName: 'M.',
      userfullName: 'Jeff M.'
    },
    primes: {
      principal: [],
      secondary: [],
    },
    team: [
      {
        title: 'product owners',
        users: USERS,
      },
      {
        title: 'scrum master',
        users: USERS,
      },
      {
        title: 'SME',
        users: USERS,
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
      userId: 'jeffsorndf',
      userLoginId: 'Jeff.M',
      userEmail: 'user1@test.com',
      userFirstName: 'Jeff',
      userLastName: 'M.',
      userfullName: 'Jeff M.'
    }
  }
]
