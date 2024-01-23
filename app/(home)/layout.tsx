import { Montserrat } from 'next/font/google';
import '@/app/globals.css';
import React from 'react';
import SideBar from '@/app/components/common/sidebar/Sidebar';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <section className="flex flex-col md:flex-row">
                    <div className="md:basis-[100px] lg:basis-[280px]  ">
                        <SideBar />
                    </div>
                    <div className="lg:basis-full md:w-10/12 md:mx-2 p-6 md:p-4 lg:p-6 ">
                        {children}
                    </div>
                </section>
            </body>
        </html>
    );
}
