export const getFormattedDate = (date: string | number | Date): string => {
    return new Date(date).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
