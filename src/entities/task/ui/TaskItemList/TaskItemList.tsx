// react
import { type FC } from 'react';
import type { ITask } from '../../model/types/taskTypes';
// components
import { TaskItem } from '../TaskItem/TaskItem';
// styles
import styles from './TaskItemList.module.scss';

interface TaskItemListProps {
    tasks: ITask[];
    onEdit: (id: string) => void;
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const TaskItemList: FC<TaskItemListProps> = ({
    tasks, onEdit,
}) => {
    return (
        <div className={styles.TaskItemList}>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskItem key={task.id} {...task} onEdit={onEdit} />
                ))
            ) : (
                <div className={styles.emptyMessage}>No tasks yet</div>
            )}
        </div>
    );
};
