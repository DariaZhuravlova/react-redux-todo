import type { Reducer } from 'redux';
import type { TaskStateType } from '../types/taskTypes';
import type { TaskActions } from '../types/taskAction';
import { TaskActionTypes } from '../actionTypes/taskActionTypes';

const initialState: TaskStateType = {
    tasks: [],
};

export const taskReducer: Reducer<TaskStateType, TaskActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TaskActionTypes.ADD_TASK: {
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { ...action.payload, id: crypto.randomUUID() },
                ],
            };
        }

        case TaskActionTypes.DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        }

        case TaskActionTypes.UPDATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return { ...task, ...action.payload.updatedData };
                    }
                    return task;
                }),
            };
        }

        case TaskActionTypes.CLEAR_ALL_TASKS: {
            return { ...state, tasks: initialState.tasks };
        }

        default: {
            return state;
        }
    }
};
