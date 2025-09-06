import { createReduxStore } from '@/app/config/store/createReduxStore';
import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
    const store = createReduxStore();

    return <Provider store={store}>{children}</Provider>;
};
