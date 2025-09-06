import { type FC, useEffect, useState } from 'react';
// styles
import styles from './TodoModal.module.scss';
import clsx from 'clsx';


interface TodoModalProps {
    isOpen: boolean;
    mode?: 'add' | 'edit';
    defaultText?: string;
    onClose: () => void;
    onSave: (text: string) => void;
}

export const TodoModal: FC<TodoModalProps> = ({
    isOpen,
    mode = 'add',
    defaultText = '',
    onClose,
    onSave,
}) => {
    const [text, setText] = useState(defaultText);
    const [error, setError] = useState(false);

    useEffect(() => {
        setText(defaultText);
        setError(false);
    }, [defaultText]);

    const handleSubmit = () => {
        if (text.trim()) {
            onSave(text.trim());
            setText('');
            setError(false);
            onClose();
        } else {
            setError(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{mode === 'edit' ? 'Edit Task' : 'Add Task'}</h3>
                <button onClick={onClose} className={styles.closeButton}>
                    ×
                </button>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="Enter task"
                />
                <span className={styles.errorText}>
                    {error ? 'Enter task title ' : ''}
                </span>
                <div className={styles.buttons}>
                    <button onClick={handleSubmit} className={styles.button}>
                        {mode === 'edit' ? 'Update' : 'Add'}
                    </button>
                    <button
                        onClick={onClose}
                        className={clsx(styles.button, styles.cancel)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
