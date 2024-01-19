import { Settings } from 'lucide-react';
import Searchbar from '@/app/components/common/Searchbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage Your Profile',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="Settings"
                Icon={Settings}
                tagline="Manage your profile"
            />
            {children}
        </section>
    );
}
