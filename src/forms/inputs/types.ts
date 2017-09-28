export interface InputProps<T> {
    dirty: boolean;
    disabled?: boolean;
    required?: boolean;
    valid: 'yes' | 'no' | 'pending';
    value: T;
    onUpdate(newValue: T): void;
    onBlur?(): void;
    onFocus?(): void;
}
