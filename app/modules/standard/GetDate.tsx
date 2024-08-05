import { CalendarDays } from 'lucide-react';
import React from 'react';

function GetDate({ date, day }: { date?: string; day?: number }) {
    return (
        <div className="flex justify-start items-start gap-2 pb-3 border-b">
            <CalendarDays color="#F59A3B" size={26} />
            <h1 className="sm:text-lg font-semibold">{date || `Day ${day}`}</h1>
        </div>
    );
}

export default GetDate;
