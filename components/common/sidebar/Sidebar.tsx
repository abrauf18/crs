'use client';

import { signOut } from 'next-auth/react';
import  { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    User as UserIcon,
    Settings,
    Menu,
    X,
    LogOut,
    LayoutGrid,
    CreditCard,
    BookText,
} from 'lucide-react';
import crsLogo from '@/assets/images/crsclogo.svg';
import ResourceIcon from '@/assets/icons/ResourceIcon';
import TeacherIcon from '@/assets/icons/TeacherIcon';
import NavigationItem, { NavigationItemProps } from './NavigationItem';

export default function SideBar() {
    const [menu, SetMenu] = useState(false);
    const path = usePathname();

    let navItems: NavigationItemProps[] = [];
    if (path.startsWith('/admin')) {
        navItems = [
            // {
            //     to: '/admin',
            //     ItemIcon: LayoutGrid,
            //     itemText: 'Dashboard',
            // },
            // {
            //     to: '/admin/video',
            //     ItemIcon: SlideShowIcon,
            //     itemText: 'Video',
            // },
            // {
            //     to: '/admin/resources',
            //     ItemIcon: ResourceIcon,
            //     itemText: 'Resources',
            // },
            {
                to: '/admin/courses',
                ItemIcon: ResourceIcon,
                itemText: 'Courses',
            },
            // {
            //     to: '#',
            //     ItemIcon: QueryIcon,
            //     itemText: 'Query',
            // },
            // {
            //     to: '/admin/standard',
            //     ItemIcon: StandardIcon,
            //     itemText: 'Standard',
            // },
            {
                to: '/admin/users',
                ItemIcon: UserIcon,
                itemText: 'Users',
            },
            {
                to: '/admin/setting',
                ItemIcon: Settings,
                itemText: 'Settings',
            },
            {
                to: '#',
                ItemIcon: LogOut,
                itemText: 'Logout',
                onClick: () => signOut({ callbackUrl: '/signin' }),
            },
        ];
    } else if (path.startsWith('/teacher')) {
        navItems = [
            // {
            //     to: '/teacher',
            //     ItemIcon: LayoutGrid,
            //     itemText: 'Dashboard',
            // },
            // {
            //     to: '/teacher/learning-plans',
            //     ItemIcon: StandardIcon,
            //     itemText: 'Learning Plans',
            // },
            {
                to: '/teacher/courses',
                ItemIcon: BookText,
                itemText: 'Courses',
            },
            // {
            //     to: '/teacher/classroom',
            //     ItemIcon: GraduationCap,
            //     itemText: 'Classroom',
            // },
            {
                to: '/teacher/setting',
                ItemIcon: Settings,
                itemText: 'Settings',
            },
            {
                to: '#',
                ItemIcon: LogOut,
                itemText: 'Logout',
                onClick: () => signOut({ callbackUrl: '/signin' }),
            },
        ];
    } else if (path.startsWith('/school')) {
        navItems = [
            {
                to: '/school',
                ItemIcon: LayoutGrid,
                itemText: 'Dashboard',
            },
            {
                to: '/school/teachers',
                ItemIcon: TeacherIcon,
                itemText: 'Teachers',
            },
            {
                to: '/school/classrooms',
                ItemIcon: BookText,
                itemText: 'Classrooms',
            },
            {
                to: '/school/payment',
                ItemIcon: CreditCard,
                itemText: 'Payments',
            },
            {
                to: '/school/setting',
                ItemIcon: Settings,
                itemText: 'Settings',
            },
            {
                to: '#',
                ItemIcon: LogOut,
                itemText: 'Logout',
                onClick: () => signOut({ callbackUrl: '/signin' }),
            },
        ];
    }

    return (
        <section className="bg-light-gray md:w-[90px] lg:w-fit md:p-3 md:fixed">
            {/* Desktop Navbar */}
            <ul className="lg:flex flex-col w-full items-center justify-center hidden  pt-5 h-screen">
                <Image
                    src={crsLogo as string}
                    alt="crs logo"
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        marginBottom: '35px',
                    }}
                />
                <div className="flex flex-col justify-start items-center h-full">
                    {navItems
                        .slice(0, navItems.length - 2)
                        .map((item, index) => (
                            <NavigationItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + 1}
                                to={item.to}
                                ItemIcon={item.ItemIcon}
                                itemText={item.itemText}
                            />
                        ))}
                </div>
                <div className="mb-5">
                    {navItems
                        .slice(navItems.length - 2, navItems.length)
                        .map((item, index) => (
                            <NavigationItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + 1}
                                to={item.to}
                                ItemIcon={item.ItemIcon}
                                itemText={item.itemText}
                                onClick={item.onClick}
                            />
                        ))}
                </div>
            </ul>

            {/* Tab View NavBar */}
            <ul className="md:flex lg:hidden flex-col w-full items-center justify-center hidden  pt-5 h-screen">
                <Image
                    src={crsLogo as string}
                    alt="crs logo"
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        marginBottom: '35px',
                    }}
                />
                <div className="flex flex-col justify-start items-center h-full">
                    {navItems
                        .slice(0, navItems.length - 2)
                        .map((item, index) => (
                            <NavigationItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + 1}
                                to={item.to}
                                ItemIcon={item.ItemIcon}
                                // itemText={item.itemText}
                            />
                        ))}
                </div>
                <div className="mb-5">
                    {navItems
                        .slice(navItems.length - 2, navItems.length)
                        .map((item, index) => (
                            <NavigationItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + 1}
                                to={item.to}
                                ItemIcon={item.ItemIcon}
                                onClick={item.onClick}
                                // itemText={item.itemText}
                            />
                        ))}
                </div>
            </ul>

            {/* Mobile Navbar */}
            <ul className="md:hidden bg-light-gray w-screen p-4">
                <div className="flex justify-between items-center">
                    <Image
                        src={crsLogo as string}
                        alt="crs logo"
                        priority
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain',
                        }}
                    />
                    <div onClick={() => SetMenu(!menu)}>
                        {menu ? (
                            <X width={35} height={35} />
                        ) : (
                            <Menu width={35} height={35} />
                        )}
                    </div>
                </div>
                {menu && (
                    <div className="flex flex-col justify-start items-center h-full">
                        {navItems.map((item, index) => (
                            <NavigationItem
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + 1}
                                to={item.to}
                                ItemIcon={item.ItemIcon}
                                itemText={item.itemText}
                                onClick={item.onClick}
                                closeMenu={() => SetMenu(false)}
                            />
                        ))}
                    </div>
                )}
            </ul>
        </section>
    );
}
