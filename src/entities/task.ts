export type WithId = {
  id: string;
};

export type TaskNoId = {
  title: string;
  owner: string;
  isCompleted: boolean;
};

export type Task = WithId & TaskNoId;
