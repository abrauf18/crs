"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface NavigationItemProps {
    to: string;
    itemIconDark: string | StaticImport;
    itemIconLight: string | StaticImport;
    itemText: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, itemIconDark, itemIconLight, itemText }) => {
    const pathname = usePathname();
    return (
        <Link
            className={`flex justify-start items-center w-48 p-3 mb-2 rounded-lg font-semibold text-sm ${pathname === to ? "text-white bg-primary-color" : "text-black"
                }`}
            href={to}
        >
            <Image className="mx-4" src={pathname === to ? itemIconLight : itemIconDark} alt={`${itemText} icon`} />
            <li>{itemText}</li>
        </Link>
    );
};

export default NavigationItem;