// react
import { type FC } from 'react';
import { useDispatch } from 'react-redux'; 
// icons
import { IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
// helpers
import { getFormattedDate } from '@/shared/libs/helpers/getFormattedDate';
// styles
import styles from './TaskItem.module.scss';
import type { ITask } from '../../model/types/taskTypes';
import { taskActionCreators } from '../../model/actionCreators/taskActionCreators';

interface TaskItemProps extends ITask {
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}


export const TaskItem: FC<TaskItemProps> = ({
    completed,
    id,
    text,
    date,
    onEdit,
    onDelete,
    onToggle,
}) => {
    const dispatch = useDispatch();

    const toggleCompleted = () => {
        if (onToggle) {
            onToggle(id);
        } else {
            dispatch(
                taskActionCreators.updateTask({
                    id,
                    updatedData: { completed: !completed },
                })
            );
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        } else {
            dispatch(taskActionCreators.deleteTask(id));
        }
    };

    const handleEdit = () => {
        onEdit?.(id);
    };

    const formattedDate = getFormattedDate(date);
    
    return (
        <div
            className={`${styles.TaskItem} ${completed ? styles.completed : ''}`}
        >
            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={toggleCompleted}
                    className={styles.checkbox}
                />
                <span className={styles.checkmark} />
            </label>

            <div className={styles.content}>
                <span className={styles.text}>{text}</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>

            <div className={styles.actions}>
                <button onClick={handleDelete} className={styles.delete}>
                    <IoMdTrash size={24} />
                </button>
                <button onClick={handleEdit} className={styles.edit}>
                    <MdEdit size={24} />
                </button>
            </div>
        </div>
    );
};
