import Searchbar from '@/app/components/common/Searchbar';
import VideoIcon from '@/app/assets/icons/VideoIcon';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All Video's"
                Icon={VideoIcon}
                tagline="Your All Video’s Here"
            />
            {children}
        </section>
    );
}
