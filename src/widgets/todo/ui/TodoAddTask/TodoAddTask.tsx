import styles from './TodoAddTask.module.scss';

interface Props {
    onAdd: () => void;
}

export const TodoAddTask = ({ onAdd }: Props) => (
    <div className={styles.buttons}>
        <button onClick={onAdd} className={styles.addButton}>
            Add Task
        </button>
    </div>
);
