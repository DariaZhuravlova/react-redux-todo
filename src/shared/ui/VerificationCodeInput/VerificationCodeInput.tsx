// react
import type { FC, ChangeEvent } from 'react';
import { useRef } from "react";
// styles
import styles from "./VerificationCodeInput.module.scss";
// libs
import clsx from "clsx";
import { DIGIT_REGEX } from "../../libs/constants/digit";

interface VerificationCodeInputProps {
    title?: string;
    helperText?: string;
    disabled?: boolean;
    length?: number;
    size?: "small" | "medium" | "large";
    placeholder?: string;
    onComplete?: (code: string) => void;
}

export const VerificationCodeInput: FC<VerificationCodeInputProps> = ({
    title,
    helperText,
    disabled = false,
    length = 4,
    size = "medium",
    placeholder = "0",
    onComplete,
}) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>(Array.from({length}));

    const onValueChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!DIGIT_REGEX.test(value)) return;

        if (inputsRef.current[index]) {
            inputsRef.current[index]!.value = value;
        }

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        const code = inputsRef.current.map((input) => input?.value || "").join("");
        if (code.length === length && !code.includes("")) {
            onComplete?.(code);
        }
    };


    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !inputsRef.current[index]?.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className={clsx(styles.container, styles[size])}>
            {title && <label className={styles.title}>{title}</label>}

            <div className={styles.inputWrapper}>
                {Array.from({length}).map((_, index) => (
                    <div
                        key={index}
                        className={styles.inputContainer}
                    >
                        <input
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            type="text"
                            placeholder={placeholder}
                            maxLength={1}
                            className={clsx(styles.input, {
                                [styles.filled]: (inputsRef.current[index]?.value?.length || 0) > 0,
                            })}
                            disabled={disabled}
                            onChange={(e) => onValueChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                        {length === 6 && index === 2 && <span className={styles.separator}>-</span>}
                    </div>
                ))}
            </div>

            {helperText && <p className={styles.helperText}>{helperText}</p>}
        </div>
    );
};
