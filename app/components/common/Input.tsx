import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormError from './FormError';

interface InputPropsInterface {
    name: string;
    placeholder?: string;
    type: string;
    rules?: Record<string, any>;
}

function Input({
    name,
    placeholder,
    type,
    rules,
}: InputPropsInterface): JSX.Element {
    const { register } = useFormContext();

    return (
        <div className="common-input  my-2 position-relative">
            <input
                className={` mt-1 block w-full px-3 py-3 bg-slate-100 border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium`}
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            <FormError name={name} />
        </div>
    );
}

export default Input;
