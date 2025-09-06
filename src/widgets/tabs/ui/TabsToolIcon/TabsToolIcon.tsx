//libs
import clsx from 'clsx';
//assets
import Arrow from '@/shared/libs/assets/svg/icons/arrowRight.svg';
import OpenTabsDropdownIcon from '@/shared/libs/assets/svg/icons/dotsVertical.svg';
//styles
import styles from './TabsToolIcon.module.scss';

interface TabsToolIconProps {
    onClick?: (position: 'left' | 'right') => void;
    behavior?: 'scrollable' | 'arrows' | 'dropdown';
    size?: '32' | '36' | '40';
    isRotate?: boolean;
    position: 'left' | 'right';
    isDisabled?: boolean;
    isOpenDropdown?: boolean;
}

export const TabsToolIcon = ({
    onClick,
    size = '40',
    behavior,
    isRotate,
    position,
    isDisabled,
    isOpenDropdown,
}: TabsToolIconProps) => {
    const src =
        behavior === 'arrows'
            ? Arrow
            : behavior === 'dropdown'
              ? OpenTabsDropdownIcon
              : '';
    return (
        <>
            {!isDisabled &&
                ((behavior === 'arrows' && position === 'left') ||
                    (behavior === 'arrows' && position === 'right') ||
                    (behavior === 'dropdown' && position === 'right')) && (
                    <div
                        onClick={() => onClick?.(position)}
                        className={clsx(styles.icon, {
                            [styles.size32]: size === '32',
                            [styles.size36]: size === '36',
                            [styles.size40]: size === '40',
                            [styles.rotate]: isRotate,
                            [styles.active]:
                                isOpenDropdown && behavior === 'dropdown',
                            [styles.gap]:
                                behavior === 'dropdown' && position === 'right',
                        })}
                    >
                        <img src={src} alt="icon" />
                    </div>
                )}
        </>
    );
};
