'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Searchbar from '@/app/components/common/Searchbar';

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { back } = useRouter();
    return (
        <section>
            <Searchbar
                headerText="Kathryn Murphy"
                tagline="nathan.roberts@example.com"
                isShowBackArrow
                onBackClick={back}
            />
            {children}
        </section>
    );
}
