import { UserIcon } from 'lucide-react';
import { Metadata } from 'next';
import Searchbar from '@/app/components/common/Searchbar';

export const metadata: Metadata = {
    title: 'Users',
    description: 'Manage Your All User’s',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All User’s"
                Icon={UserIcon}
                tagline="Manage Your All User’s"
            />
            {children}
        </section>
    );
}
