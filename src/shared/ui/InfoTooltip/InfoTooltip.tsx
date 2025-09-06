// react
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
// assets
import info from '../../libs/assets/svg/icons/info.svg';
// styles
import styles from './InfoTooltip.module.scss';

interface InfoTooltipProps {
    children?: ReactNode;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span
            className={styles.tooltipWrapper}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <img src={info} alt="info" className={styles.tooltipIcon} />
            {isVisible && (
                <div className={styles.tooltipContainer}>
                    <span className={styles.tooltip}>
                        <span className={styles.tooltipText}>{children}</span>
                    </span>
                    <span className={styles.tooltipArrow}></span>
                </div>
            )}
        </span>
    );
};


