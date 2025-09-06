//libs
import clsx from 'clsx';
//assets
//styles
import styles from './TabsItem.module.scss';
//types
import type { TabsDataType } from '../../model/types/tabsDataType';
interface TabsItemProps {
    onClick?: (label: string) => void;
    option: TabsDataType;
    size?: string;
    variant?: string;
    isActiveTab: boolean;
    isDisabled?: boolean;
    isHover?: boolean;
}

export const TabsItem = ({
    onClick,
    option,
    size,
    variant,
    isActiveTab,
    isDisabled,
    isHover,
}: TabsItemProps) => {
    return (
        <>
            <div
                onClick={() => onClick?.(option.label)}
                className={clsx(styles.tabItemWrapper, {
                    [styles.size32]: size === '32',
                    [styles.size36]: size === '36',
                    [styles.size40]: size === '40',
                    [styles.underlineFilled]: variant === 'underlineFilled',
                    [styles.itemHover]: isHover,
                    [styles.active]: isActiveTab,
                    [styles.disabled]: isDisabled,
                })}
            >
                <button type="button" className={clsx(styles.tabItem)}>
                    {option.label}
                </button>
                {option.badgeCount && (
                    <span className={clsx(styles.tabBadge)}>
                        {' '}
                        {option.badgeCount}
                    </span>
                )}
            </div>
        </>
    );
};
