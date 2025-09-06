import { TaskActionTypes } from '../actionTypes/taskActionTypes';
import type {
    AddTaskType,
    ClearAllTasksType,
    DeleteTaskType,
    UpdateTaskType,
} from '../types/taskAction';

const addTask = (payload: AddTaskType['payload']): AddTaskType => {
    return {
        type: TaskActionTypes.ADD_TASK,
        payload: payload,
    };
};

const updateTask = (payload: UpdateTaskType['payload']): UpdateTaskType => {
    return {
        type: TaskActionTypes.UPDATE_TASK,
        payload: payload,
    };
};

const deleteTask = (payload: DeleteTaskType['payload']): DeleteTaskType => {
    return {
        type: TaskActionTypes.DELETE_TASK,
        payload: payload,
    };
};

const clearAllTasks = (): ClearAllTasksType => {
    return {
        type: TaskActionTypes.CLEAR_ALL_TASKS,
    };
};

export const taskActionCreators = {
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
};
