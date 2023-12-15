import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import Searchbar from '@/app/components/common/Searchbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All Resources"
                Icon={ResourceIcon}
                tagline="Your All Resources Here"
            />
            {children}
        </section>
    );
}
