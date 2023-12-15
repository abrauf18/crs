import Searchbar from '@/app/components/common/Searchbar';
import { UserIcon } from 'lucide-react';

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
