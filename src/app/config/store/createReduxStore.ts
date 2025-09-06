import { taskReducer } from '@/entities/task';
import { combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

export const createReduxStore = () => {
    const reducers = {
        task: taskReducer,
    };

    const rootReducer = combineReducers(reducers);

    const store = createStore(
        rootReducer,
        // composeWithDevTools() 
    );

    return store;
};
