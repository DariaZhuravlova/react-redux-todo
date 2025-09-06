import styles from './TodoFooter.module.scss';

interface Props {
    total: number;
    onClear: () => void;
}

export const TodoFooter = ({ total, onClear }: Props) => (
    <div className={styles.buttons}>
        <div className={styles.totalTasks}>total tasks: {total}</div>
        <button onClick={onClear} className={styles.clearButton}>
            clear all x
        </button>
    </div>
);
