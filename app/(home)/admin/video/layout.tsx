import { Metadata } from 'next';
import Searchbar from '@/app/components/common/Searchbar';
import VideoIcon from '@/app/assets/icons/VideoIcon';

export const metadata: Metadata = {
    title: 'Videos',
    description: 'Your All Videos Are Here',
};
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All Videos"
                Icon={VideoIcon}
                tagline="Your All Videos Are Listed Here"
            />
            {children}
        </section>
    );
}
