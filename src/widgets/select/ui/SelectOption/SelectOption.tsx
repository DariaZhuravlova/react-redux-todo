import type { FC } from 'react';
import type { OptionType } from '../../model/types/optionType';
// styles
import styles from './SelectOption.module.scss';
import clsx from 'clsx';
// assets
import checkmark from '@/shared/libs/assets/svg/icons/checkmark.svg';

interface SelectOptionProps {
    size?: '24' | '32' | '36' | '40' | '44' | '48';
    option: OptionType;
    isSelected: boolean;
    isShowIcons?: boolean;
    onClick: () => void;
}

export const SelectOption: FC<SelectOptionProps> = ({
    option,
    size = '40',
    isSelected,
    isShowIcons = true,
    onClick,
}) => (
    <li
        className={clsx(styles.optionItem, styles[`size${size}`], {
            [styles.selected]: isSelected,
        })}
        onClick={onClick}
    >
        <span className={styles.optionLabel}>
            {isShowIcons && (
                <span
                    className={clsx(styles.icon, {
                        [styles.emptyIcon]: !option.icon,
                    })}
                >
                    {option.icon}
                </span>
            )}
            <span className={styles.labelText}>{option.label}</span>
        </span>
        {isSelected && (
            <span className={styles.checkmark}>
                <img src={checkmark} alt="checkmark" />
            </span>
        )}
    </li>
);
