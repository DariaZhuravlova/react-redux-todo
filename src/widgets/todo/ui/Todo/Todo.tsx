// react
import { useState } from 'react';
// styles
import styles from './Todo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskTasks } from '@/entities/task/model/selectors/taskSelectors';
import { taskActionCreators } from '@/entities/task/model/actionCreators/taskActionCreators';
// components
import { TodoModal } from '@/widgets/todo/ui/TodoModal/TodoModal';
import { TodoAddTask } from '../TodoAddTask/TodoAddTask';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoTaskList } from '../TodoTaskList/TodoTaskList';
import { TodoFooter } from '../TodoFooter/TodoFooter';

export const Todo = () => {
    const tasks = useSelector(getTaskTasks);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incompleted'>(
        'all'
    );


    const openEditModal = (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            setEditTaskId(task.id);
            setEditText(task.text);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditTaskId(null);
        setEditText('');
    };

    const handleAddTask = (text: string) => {
        dispatch(
            taskActionCreators.addTask({
                text,
                completed: false,
                date: new Date().toISOString(),
            })
        );
    };

    const handleUpdateTask = (text: string) => {
        if (!editTaskId) return;
        dispatch(
            taskActionCreators.updateTask({
                id: editTaskId,
                updatedData: { text },
            })
        );
    };

    const handleSave = (text: string) => {
        editTaskId ? handleUpdateTask(text) : handleAddTask(text);
        closeModal();
    };

    console.log(tasks);

    const handleClearAll = () => {
        dispatch(taskActionCreators.clearAllTasks());
    };

    return (
        <div className={styles.Todo}>
            <h2 className={styles.title}>Todo list</h2>
            <div className={styles.buttons}>
                <TodoAddTask onAdd={() => setIsModalOpen(true)} />
                <TodoFilter filter={filter} onChange={setFilter} />
            </div>
            <TodoTaskList tasks={tasks} filter={filter} onEdit={openEditModal} />
            <TodoFooter total={tasks.length} onClear={handleClearAll} />
            <TodoModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                defaultText={editText}
                mode={editTaskId ? 'edit' : 'add'}
            />
        </div>
    );
};


