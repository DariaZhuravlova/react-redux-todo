//react
import {
    useState,
    type RefObject,
    type Dispatch,
    type SetStateAction,
} from 'react';
//hooks
import { useTabsVisibility } from '../../libs/hooks/useTabsVisibility.ts';
//libs
import clsx from 'clsx';
//ui
import { TabsItem } from '../TabsItem/TabsItem.tsx';
//styles
import styles from './TabsList.module.scss';
//types
import type { TabsDataType } from '../../model/types/tabsDataType.ts';

interface TabsListProps {
    onClick: (label: string) => void;
    setDropdownTabs: Dispatch<SetStateAction<TabsDataType[]>>;
    options: TabsDataType[];
    size?: string;
    variant?: string;
    behavior: string;
    activeTab?: string;
    wrapperNavWidth?: number;
    isDisabled?: boolean;
    scrollRef: RefObject<HTMLDivElement | null>;
}

const settings = {
    fontSize: 14,
    paddingX: 8,
    fontFamily: 'Inter',
    fontWeight: 600,
};

export const TabsList = ({
    onClick,
    setDropdownTabs,
    options,
    size,
    variant,
    behavior,
    activeTab,
    wrapperNavWidth,
    isDisabled,
    scrollRef,
}: TabsListProps) => {
    const [visibleTabs, setVisibleTabs] = useState<TabsDataType[]>(options);

    useTabsVisibility({
        wrapperNavWidth,
        behavior,
        options,
        settings,
        setVisibleTabs,
        setDropdownTabs,
    });

    return (
        <>
            <nav
                ref={scrollRef}
                className={clsx(styles.tabsWrapper, {
                    [styles.size32]: size === '32',
                    [styles.size36]: size === '36',
                    [styles.size40]: size === '40',
                    [styles.scrollable]: behavior === 'scrollable',
                    [styles.dropdown]: behavior === 'dropdown',
                    [styles.arrows]: behavior === 'arrows',
                })}
            >
                {visibleTabs?.map((option, index) => (
                    <TabsItem
                        key={index}
                        variant={variant}
                        isActiveTab={activeTab === option.label}
                        onClick={onClick}
                        option={option}
                        size={size}
                        isDisabled={isDisabled}
                    />
                ))}
            </nav>
        </>
    );
};
