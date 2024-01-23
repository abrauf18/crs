'use client';

import { useState } from 'react';

export function OTPInput({ maxLength = 1 }: { maxLength?: number }) {
    const [value, setValue] = useState('');

    const handleInput = (e: any) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        setValue(inputValue.slice(0, maxLength));
    };

    return (
        <input
            className="mt-1 block w-full text-center px-3 py-3 bg-slate-100 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="text"
            value={value}
            maxLength={maxLength}
            onInput={handleInput}
        />
    );
}
