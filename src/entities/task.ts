import { WithId } from '../types/id.js';

export type TaskNoId = {
  title: string;
  owner: string;
  isCompleted: boolean;
};

export type Task = WithId & TaskNoId;
