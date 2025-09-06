// react
import type { FC } from 'react';
// components
import { Avatar } from '../avatar';
// libs
import clsx from 'clsx';
// styles
import styles from './AvatarWithInfo.module.scss';

interface AvatarWithInfoProps {
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    userCardSize?: '32' | '40' | '48' | '56';
    uiType?: 'fill' | 'none';
    isClickable?: boolean;
    isOnlineIndicator?: boolean;
    onClick?: () => void;
}

export const AvatarWithInfo: FC<AvatarWithInfoProps> = ({
    imageUrl,
    firstName,
    lastName,
    email,
    userCardSize = '40',
    uiType = 'none',
    isClickable = false,
    isOnlineIndicator = true,
    onClick,
}) => {
    return (
        <div
            className={clsx(styles.userCard, {
                // userCardSize
                [styles.size32]: userCardSize === '32',
                [styles.size40]: userCardSize === '40',
                [styles.size48]: userCardSize === '48',
                [styles.size56]: userCardSize === '56',
                // uiType
                [styles.fill]: uiType === 'fill',
                [styles.none]: uiType === 'none',
                // isClickable
                [styles.clickable]: isClickable,
            })}
            onClick={onClick}
            tabIndex={uiType === 'fill' ? 0 : -1}
        >
            <Avatar
                imageUrl={imageUrl}
                firstName={firstName}
                lastName={lastName}
                size={userCardSize}
                isOnlineIndicator={isOnlineIndicator}
                tabIndex={uiType === 'none' ? 0 : -1}
                disableFocus={uiType === 'fill'}
                className={styles.avatarWrapper}
            />
            <div className={styles.userInfo}>
                <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
                <p className={styles.userEmail}>{email}</p>
            </div>
        </div>
    );
};
