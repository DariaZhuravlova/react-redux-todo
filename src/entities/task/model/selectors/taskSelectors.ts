import type { StateSchema } from '@/app/config/store/stateSchema';

export const getTaskState = (state: StateSchema) => state.task;

export const getTaskTasks = (state: StateSchema) => state.task.tasks;

export const getTaskTasksLength = (state: StateSchema) =>
    state.task.tasks.length;
