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
                headerText="Kathryn Murphy"
                tagline="nathan.roberts@example.com"
                Icon={User}
            />
            {children}
        </section>
    );
}
