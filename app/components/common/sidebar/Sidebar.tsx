'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import crsLogo from '@/app/assets/images/crsclogo.svg';
import {
    User as UserIcon,
    Settings,
    Menu,
    X,
    LogOut,
    LayoutGrid,
} from 'lucide-react';
import SlideShowIcon from '@/app/assets/icons/SlideShowIcon';
import ResourceIcon from '@/app/assets/icons/ResourceIcon';
import QueryIcon from '@/app/assets/icons/QueryIcon';
import StandardIcon from '@/app/assets/icons/StandardIcon';
import NavigationItem from './NavigationItem';

export default function SideBar() {
    const [menu, SetMenu] = useState(false);
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
                    <NavigationItem
                        to="/"
                        ItemIcon={LayoutGrid}
                        itemText="Dashboard"
                    />
                    <NavigationItem
                        to="/video"
                        ItemIcon={SlideShowIcon}
                        itemText="Video"
                    />
                    <NavigationItem
                        to="/resources"
                        ItemIcon={ResourceIcon}
                        itemText="Resources"
                    />
                    <NavigationItem
                        to="#"
                        ItemIcon={QueryIcon}
                        itemText="Query"
                    />
                    <NavigationItem
                        to="/standard"
                        ItemIcon={StandardIcon}
                        itemText="Standard"
                    />
                    <NavigationItem
                        to="/users"
                        ItemIcon={UserIcon}
                        itemText="User’s"
                    />
                    <NavigationItem
                        to="/students"
                        ItemIcon={UserIcon}
                        itemText="Students"
                    />
                </div>
                <div className="mb-2">
                    <NavigationItem
                        to="/setting"
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
                        <NavigationItem
                            to="/"
                            ItemIcon={LayoutGrid}
                            itemText="Dashboard"
                        />
                        <NavigationItem
                            to="/video"
                            ItemIcon={SlideShowIcon}
                            itemText="Video"
                        />
                        <NavigationItem
                            to="/resources"
                            ItemIcon={ResourceIcon}
                            itemText="Resources"
                        />
                        <NavigationItem
                            to="#"
                            ItemIcon={QueryIcon}
                            itemText="Query"
                        />
                        <NavigationItem
                            to="/standard"
                            ItemIcon={StandardIcon}
                            itemText="Standard"
                        />
                        <NavigationItem
                            to="/users"
                            ItemIcon={UserIcon}
                            itemText="User’s"
                        />
                        <NavigationItem
                            to="/setting"
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
