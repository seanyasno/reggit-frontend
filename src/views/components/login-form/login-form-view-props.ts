import {ChangeEvent, FormEvent} from 'react';

export default interface ILoginFormViewProps {
    errors: object;
    isLoading: boolean;
    onSubmit(event: FormEvent<HTMLFormElement>): void;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
}