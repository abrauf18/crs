'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import crsLogo from '@/app/assets/images/crsclogo.svg';
import {
    User as UserIcon,
    Settings,
    Menu,
    X,
    LogOut,
    LayoutGrid,
    LucideIcon,
    Lightbulb,
    Bookmark,
} from 'lucide-react';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import QueryIcon from '@/app/assets/icons/QueryIcon';
import StandardIcon from '@/app/assets/icons/StandardIcon';
import NavigationItem, { NavigationItemProps } from './NavigationItem';

export default function SideBar() {
    const [menu, SetMenu] = useState(false);
    const path = usePathname();

    let navItems: NavigationItemProps[] = [];
    if (path.startsWith('/admin')) {
        navItems = [
            {
                to: '/admin',
                ItemIcon: LayoutGrid,
                itemText: 'Dashboard',
            },
            {
                to: '/admin/video',
                ItemIcon: SlideShowIcon,
                itemText: 'Video',
            },
            {
                to: '/admin/resources',
                ItemIcon: ResourceIcon,
                itemText: 'Resources',
            },
            {
                to: '#',
                ItemIcon: QueryIcon,
                itemText: 'Query',
            },
            {
                to: '/admin/standard',
                ItemIcon: StandardIcon,
                itemText: 'Standard',
            },
            {
                to: '/admin/users',
                ItemIcon: UserIcon,
                itemText: 'User’s',
            },
        ];
    } else if (path.startsWith('/teacher')) {
        navItems = [
            {
                to: '/teacher',
                ItemIcon: LayoutGrid,
                itemText: 'Dashboard',
            },
            {
                to: '#',
                ItemIcon: SlideShowIcon,
                itemText: "Standard's",
            },
            {
                to: '/teacher/students',
                ItemIcon: UserIcon,
                itemText: 'Students',
            },
            {
                to: '/teacher/learning-plans',
                ItemIcon: QueryIcon,
                itemText: 'Learning Plans',
            },
            {
                to: '/teacher/classroom',
                ItemIcon: StandardIcon,
                itemText: 'Classroom',
            },
        ];
    } else if (path.startsWith('/student')) {
        navItems = [
            {
                to: '/student',
                ItemIcon: LayoutGrid,
                itemText: 'Dashboard',
            },
            {
                to: '#',
                ItemIcon: Lightbulb,
                itemText: 'Learning',
            },
            {
                to: '#',
                ItemIcon: Bookmark,
                itemText: "Saved Video's",
            },
            {
                to: '/student/profile',
                ItemIcon: UserIcon,
                itemText: 'Profile',
            },
            {
                to: '/teacher/resource',
                ItemIcon: ResourceIcon,
                itemText: 'Resource',
            },
        ];
    }

    return (
        <section className="bg-light-gray md:p-5 md:fixed">
            <ul className="flex flex-col w-full items-center justify-center pt-5 h-screen mobile:hidden">
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
                    {navItems.map((item, index) => (
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
                    <NavigationItem
                        to="/admin/setting"
                        ItemIcon={Settings}
                        itemText="Settings"
                    />
                    <NavigationItem
                        to="#"
                        ItemIcon={LogOut}
                        itemText="Logout"
                    />
                </div>
            </ul>
            <ul
                onClick={() => SetMenu(!menu)}
                className="md:hidden bg-light-gray w-screen p-2"
            >
                <div className="flex justify-between items-center">
                    <Image
                        src={crsLogo as string}
                        alt="crs logo"
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain',
                        }}
                    />
                    {menu ? (
                        <X width={35} height={35} />
                    ) : (
                        <Menu width={35} height={35} />
                    )}
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
                            />
                        ))}
                        <NavigationItem
                            to="/admin/setting"
                            ItemIcon={Settings}
                            itemText="Settings"
                        />
                        <NavigationItem
                            to="#"
                            ItemIcon={LogOut}
                            itemText="Logout"
                        />
                    </div>
                )}
            </ul>
        </section>
    );
}
