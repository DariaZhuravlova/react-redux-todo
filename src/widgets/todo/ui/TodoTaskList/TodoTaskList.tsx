import { TaskItemList } from '@/entities/task/ui/TaskItemList/TaskItemList';
import type { ITask } from '@/entities/task/model/types/taskTypes';

interface Props {
    tasks: ITask[];
    filter: 'all' | 'completed' | 'incompleted';
    onEdit: (id: string) => void;
}

export const TodoTaskList = ({ tasks, filter, onEdit }: Props) => {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incompleted') return !task.completed;
        return true;
    });

    return <TaskItemList tasks={filteredTasks} onEdit={onEdit} />;
};
