import React from 'react';
import { X } from 'lucide-react';

interface InputPropsInterface {
    name: string;
    placeholder?: string;
    register: any;
    type: string;
    errors?: any;
}

function Input({
    name,
    placeholder,
    register,
    type,
    errors,
}: InputPropsInterface): JSX.Element {
    return (
        <div className="common-input  my-2 position-relative">
            <input
                className={` mt-1 block w-full px-3 py-3 bg-slate-100 border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
                type={type}
                name={name}
                placeholder={placeholder}
                {...register}
            />
            {errors[name]?.type && (
                <div className="flex items-center gap-1 mt-1">
                    <X size={20} color="#E6500D" />
                    <p className={`text-red-500 text-xs `}>
                        {errors[name]?.message}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Input;
