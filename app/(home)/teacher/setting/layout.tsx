import Searchbar from '@/app/components/common/Searchbar';
import { Settings } from 'lucide-react';

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
