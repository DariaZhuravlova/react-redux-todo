import type { ReactNode } from 'react';

export type OptionType = {
    label: string;
    icon?: ReactNode;
    [key: string]: unknown;
};
