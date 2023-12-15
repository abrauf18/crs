import Searchbar from '@/app/components/common/Searchbar';
import { FileVideoIcon } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All Video's"
                Icon={FileVideoIcon}
                tagline="Your All Video’s Here"
            />
            {children}
        </section>
    );
}
