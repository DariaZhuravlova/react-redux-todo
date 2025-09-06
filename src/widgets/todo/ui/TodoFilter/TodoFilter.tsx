import styles from './TodoFilter.module.scss';

interface Props {
    filter: 'all' | 'completed' | 'incompleted';
    onChange: (value: 'all' | 'completed' | 'incompleted') => void;
}

export const TodoFilter = ({ filter, onChange }: Props) => (
    <select
        value={filter}
        onChange={e =>
            onChange(e.target.value as 'all' | 'completed' | 'incompleted')
        }
        className={styles.select}
    >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incompleted">Incompleted</option>
    </select>
);
