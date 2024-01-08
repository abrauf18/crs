import Searchbar from '@/app/components/common/Searchbar';
import { User } from 'lucide-react';

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="Classroom"
                tagline="Here;s Your All Assigned Classroom"
                Icon={User}
            />
            {children}
        </section>
    );
}
