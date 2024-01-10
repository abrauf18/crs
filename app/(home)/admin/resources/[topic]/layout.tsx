'use client';

import Searchbar from '@/app/components/common/Searchbar';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import { usePathname } from 'next/navigation';

export default function TopicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname().split('/')[3];
    const modPath = path[0].toUpperCase() + path.slice(1);
    const topicName = modPath.replace(/^Topic/, 'Topic ');

    return (
        <section>
            <Searchbar
                headerText={topicName}
                Icon={ResourceIcon}
                tagline={`All Resources Assigned to ${topicName}`}
            />
            {children}
        </section>
    );
}
