"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface NavigationItemProps {
    to: string;
    ItemIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
    itemText: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, ItemIcon, itemText }) => {
    const pathname = usePathname();
    return (
        <Link
            className={`flex justify-start items-center w-48 p-3 mb-2 rounded-lg font-semibold text-sm ${pathname === to ? "text-white bg-primary-color" : "text-black"
                }`}
            href={to}
        >

            <div className="mx-4">
                {
                    pathname === to ? <ItemIcon color="white" /> : <ItemIcon color="black" />

                }
            </div>
            <li>{itemText}</li>
        </Link>
    );
};

export default NavigationItem;