import type { TabsDataType } from '../../model/types/tabsDataType.ts';

interface Options {
    fontSize: number;
    paddingX: number;
    fontFamily?: string;
    fontWeight?: number | string;
}

export const getAmountElements = (
    tabs: TabsDataType[],
    containerWidth: number,
    options: Options
): number => {
    const tempContainer = document.createElement('div');
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.display = 'flex';
    tempContainer.style.fontSize = `${options.fontSize}px`;
    tempContainer.style.fontFamily = options.fontFamily || 'sans-serif';
    tempContainer.style.fontWeight = `${options.fontWeight || 400}`;
    document.body.appendChild(tempContainer);

    let totalWidth = 0;
    let visibleCount = 0;

    for (const tab of tabs) {
        const tabEl = document.createElement('div');
        tabEl.style.paddingLeft = `${options.paddingX}px`;
        tabEl.style.paddingRight = `${options.paddingX}px`;
        tabEl.style.whiteSpace = 'nowrap';
        tabEl.textContent = tab.label;

        tempContainer.appendChild(tabEl);

        const tabWidth = tabEl.getBoundingClientRect().width;

        if (totalWidth + tabWidth <= containerWidth) {
            totalWidth += tabWidth;
            visibleCount++;
        } else {
            break;
        }
    }

    document.body.removeChild(tempContainer);

    return visibleCount;
};
