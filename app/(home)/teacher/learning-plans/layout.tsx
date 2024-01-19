import { Metadata } from 'next';
import StandardIcon from '@/app/assets/icons/StandardIcon';
import Searchbar from '@/app/components/common/Searchbar';

export const metadata: Metadata = {
    title: 'Learning Plan',
    description: 'Here;s Your All Assigned Classroom',
};

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="Learning Plan"
                tagline="Here’s All Your Created Plans"
                Icon={StandardIcon}
            />
            {children}
        </section>
    );
}
