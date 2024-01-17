import Searchbar from '@/app/components/common/Searchbar';
import TeacherStandardIcon from '@/app/assets/icons/TeacherStandardIcon';

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="Learning Standards"
                tagline="Here’s All Your Learning Standards"
                Icon={TeacherStandardIcon}
            />
            {children}
        </section>
    );
}
