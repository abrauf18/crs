import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SideBar from '@/components/common/sidebar/Sidebar';
import { options } from '../api/auth/[...nextauth]/options';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(options);
    if (!session) {
        return redirect('/signin');
    }
    return (
        <section className="flex flex-col md:flex-row">
            <div className="md:basis-[100px] lg:basis-[280px]  ">
                <SideBar />
            </div>
            <div className="lg:basis-full md:w-10/12 md:mx-2 p-6 md:p-4 lg:p-6 ">
                {children}
            </div>
        </section>
    );
}
