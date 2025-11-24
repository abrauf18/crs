import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standards',
    description: 'Here’s All Your Learning Standards',
};

export default function StandardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
