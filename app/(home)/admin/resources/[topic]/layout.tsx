'use client';

import Searchbar from '@/app/components/common/Searchbar';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import { usePathname } from 'next/navigation';
import { convertDashesToSpaces } from '@/lib/utils';

export default function TopicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Extracting and formatting a title from the pathname
    const title = usePathname().split('/')[3]; // Get the fourth segment of the pathname
    const formattedTitle = convertDashesToSpaces(title); // Convert dashes to spaces
    return (
        <section>
            <Searchbar
                headerText={formattedTitle}
                Icon={ResourceIcon}
                tagline={`All Resources Assigned to ${formattedTitle}`}
            />
            {children}
        </section>
    );
}
