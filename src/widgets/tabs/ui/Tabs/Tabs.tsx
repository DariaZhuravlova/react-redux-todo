//react
import { useState, useRef } from 'react';
//hooks
import { useClickOutside } from '@/shared/libs/hooks/useClickOutside';
import { useContainerWidth } from '../../libs/hooks/useContainerWidth';
//libs
import clsx from 'clsx';
//constants
import { tabsData } from '../../libs/constants/tabsData.ts';
//ui
import { TabsToolIcon } from '../TabsToolIcon/TabsToolIcon';
import { TabsList } from '../TabsList/TabsList.tsx';
import { Dropdown } from '@/shared/ui/dropdown';
import { TabsDropdownList } from '../TabsDropdownList/TabsDropdownList.tsx';
//styles
import styles from './Tabs.module.scss';
//types
import type { TabsDataType } from '../../model/types/tabsDataType.ts';

interface TabProps {
    variant?: 'underline' | 'underlineFilled';
    isDisabled?: boolean;
    size?: '32' | '36' | '40';
    behavior?: 'scrollable' | 'arrows' | 'dropdown';
}

export const Tabs = ({
    variant = 'underline',
    isDisabled,
    size = '40',
    behavior = 'scrollable',
}: TabProps) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState<string>(tabsData[0].label);

    const [dropdownTabs, setDropdownTabs] = useState<TabsDataType[]>([]);

    const divClickOutsideRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(divClickOutsideRef, () => setIsOpenDropdown(false));

    const containerRef = useRef<HTMLDivElement>(null);

    const wrapperNavRef = useRef<HTMLDivElement | null>(null);
    const widthWrapperNav = useContainerWidth(wrapperNavRef);

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    const selectTab = (tab: string) => {
        setActiveTab(tab);
        setIsOpenDropdown(false);
    };

    const onControlClick = (position: string) => {
        if (position === 'right' && behavior === 'dropdown') {
            toggleDropdown();
        } else if (behavior === 'arrows') {
            const container = containerRef.current;
            if (!container) return;
            container.scrollBy({
                left: position === 'left' ? -50 : 50,
                behavior: 'smooth',
            });
        }
    };
    return (
        <>
            <div ref={wrapperNavRef} className={clsx(styles.container)}>
                <div
                    className={clsx(styles.tabsWrapper, {
                        [styles.size32]: size === '32',
                        [styles.size36]: size === '36',
                        [styles.size40]: size === '40',
                    })}
                >
                    <TabsToolIcon
                        onClick={onControlClick}
                        position="left"
                        isDisabled={isDisabled}
                        isRotate
                        behavior={behavior}
                        size={size}
                    />
                    <TabsList
                        onClick={selectTab}
                        size={size}
                        variant={variant}
                        behavior={behavior}
                        isDisabled={isDisabled}
                        options={tabsData}
                        activeTab={activeTab}
                        wrapperNavWidth={widthWrapperNav}
                        setDropdownTabs={setDropdownTabs}
                        scrollRef={containerRef}
                    />
                    <TabsToolIcon
                        onClick={onControlClick}
                        position="right"
                        behavior={behavior}
                        isDisabled={isDisabled}
                        size={size}
                        isOpenDropdown={isOpenDropdown}
                    />
                </div>
                {behavior === 'dropdown' && (
                    <span
                        ref={divClickOutsideRef}
                        className={clsx(styles.dropdownPosition)}
                    >
                        <Dropdown isOpen={isOpenDropdown}>
                            <TabsDropdownList
                                onClick={selectTab}
                                variant={variant}
                                activeTab={activeTab}
                                size={size}
                                options={dropdownTabs}
                            />
                        </Dropdown>
                    </span>
                )}
                {!isDisabled && (
                    <div className={clsx(styles.content)}>
                        activeTab {activeTab}
                    </div>
                )}
            </div>
        </>
    );
};
