import { Scorecard } from '../models/scorecard-item';
import { USERS } from './users.data';
import { NETWORKS } from './network.data';

export const SCORECARDS: Scorecard[] = [
  {
    id: '1',
    title: 'string',
    status: {
      overall: "Y",
      quality: "G",
      time: "R",
      cost: "G",
    },
    owner: {
      userId: 'user1',
      userLoginId: 'user1',
      userEmail: 'user1@test.com'
    },
    prime: {
      userId: 'user2',
      userLoginId: 'user2',
      userEmail: 'user2@test.com'
    },
    team: [
      {
        title: 'product_owners',
        users: USERS,
      },
      {
        title: 'scrum_master',
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
  }
]
