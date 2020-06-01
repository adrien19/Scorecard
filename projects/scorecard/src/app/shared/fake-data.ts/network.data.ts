import { Network } from '../models/network.model';

export const NETWORKS: Network[] = [
  {
    name: 'M76843',
    completePlanedDate: "May 5, 2020",
    completeActualDate: "May 25, 2020",
    percentDone: 1,
    status: "Complete"
  },
  {
    name: 'M25443',
    completePlanedDate: "August 20, 2020",
    percentDone: 0.2,
    status: "On-hold"
  },
  {
    name: 'M76222',
    completePlanedDate: "September 5, 2020",
    percentDone: 0.6,
    status: "In Progress"
  },
  {
    name: 'M76836',
    completePlanedDate: "August 10, 2020",
    percentDone: 0.1,
    status: "Cancelled"
  }
]

// export enum status {
//   complete = 'Complete',
//   on_hold = 'On-hold',
//   in_progress = 'In Progress',
//   cancelled = 'Cancelled'
// }
