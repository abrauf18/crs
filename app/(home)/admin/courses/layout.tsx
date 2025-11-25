import { BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import Searchbar from '@/components/common/Searchbar';

export const metadata: Metadata = {
    title: 'Courses',
    description: 'Manage Your All Courses',
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Searchbar
                headerText="All Courses"
                Icon={BookOpen}
                tagline="Manage Your All Courses"
            />
            {children}
        </section>
    );
}
