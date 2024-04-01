import { SelectHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { X } from 'lucide-react';

interface SelectPropsInterface extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    placeholder?: string;
    register: any;
    errors?: any;
    options: { value: string; label: string }[];
}

function Select({
    name,
    placeholder,
    register,
    errors,
    options,
}: SelectPropsInterface): JSX.Element {
    return (
        <div className="relative w-full">
            <select
                className="pl-4 p-3 py-3 pr-8 bg-slate-100 border rounded-lg focus:outline-none focus:border-sky-500 
                focus:ring-1 focus:ring-sky-500 font-medium appearance-none w-full text-sm"
                name={name}
                placeholder={placeholder}
                {...register}
            >
                {options.map((option) => (
                    <option key={option.label} value={option.label}>
                        {option.value}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>
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

export default Select;
