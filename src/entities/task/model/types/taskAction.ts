import { TaskActionTypes } from '../actionTypes/taskActionTypes';
import type { ITask } from './taskTypes';

export type AddTaskType = {
    type: TaskActionTypes.ADD_TASK;
    payload: Omit<ITask, 'id'>;
};

export type UpdateTaskType = {
    type: TaskActionTypes.UPDATE_TASK;
    payload: {
        id: ITask['id'];
        updatedData: Partial<Omit<ITask, 'id'>>;
    };
};

export type DeleteTaskType = {
    type: TaskActionTypes.DELETE_TASK;
    payload: ITask['id'];
};

export type ClearAllTasksType = {
    type: TaskActionTypes.CLEAR_ALL_TASKS;
};

export type TaskActions =
    | AddTaskType
    | UpdateTaskType
    | DeleteTaskType
    | ClearAllTasksType;
