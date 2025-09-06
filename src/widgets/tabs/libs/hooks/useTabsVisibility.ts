import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { getAmountElements } from '../helpers/getAmountElements.ts';
import type { TabsDataType } from '../../model/types/tabsDataType.ts';

interface UseTabsVisibilityProps {
    wrapperNavWidth?: number;
    behavior: string;
    options: TabsDataType[];
    settings: {
        fontSize: number;
        paddingX: number;
        fontFamily?: string;
        fontWeight?: number;
    };
    setVisibleTabs: Dispatch<SetStateAction<TabsDataType[]>>;
    setDropdownTabs: Dispatch<SetStateAction<TabsDataType[]>>;
}

export const useTabsVisibility = ({
    wrapperNavWidth,
    behavior,
    options,
    settings,
    setVisibleTabs,
    setDropdownTabs,
}: UseTabsVisibilityProps) => {
    useEffect(() => {
        if (wrapperNavWidth && behavior === 'dropdown') {
            const amountTabs = getAmountElements(
                options,
                wrapperNavWidth - 100,
                settings
            );

            setVisibleTabs(options.slice(0, amountTabs));
            setDropdownTabs(options.slice(amountTabs));
        } else {
            setVisibleTabs(options);
        }
    }, [wrapperNavWidth, options, behavior, setVisibleTabs, setDropdownTabs]);
};
