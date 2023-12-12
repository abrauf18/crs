"use client";
import React, { useState } from "react";
import Image from "next/image";
import crsLogo from "@/public/assets/crsclogo.svg";
import dashboardIcondark from "@/public/assets/dark/dashboardIcon.svg";
import dashboardIconlight from "@/public/assets/light/dashboardIcon.svg";
import videoIcondark from "@/public/assets/dark/videoIcon.svg";
import videoIconlight from "@/public/assets/light/videoIcon.svg";
import resourcesIcondark from "@/public/assets/dark/resourcesIcon.svg";
import resourcesIconlight from "@/public/assets/light/resourcesIcon.svg";
import queryIcondark from "@/public/assets/dark/queryIcon.svg";
import queryIconlight from "@/public/assets/light/queryIcon.svg";
import standardIcondark from "@/public/assets/dark/standardIcon.svg";
import standardIconlight from "@/public/assets/light/standardIcon.svg";
import userIcondark from "@/public/assets/dark/usersIcon.svg";
import userIconlight from "@/public/assets/light/usersIcon.svg";
import NavigationItem from "./NavigationItem";
import settingIcondark from "@/public/assets/dark/settingIcon.svg";
import settingIconlight from "@/public/assets/light/settingIcon.svg";
import logoutIcondark from "@/public/assets/dark/logoutIcon.svg";
import logoutIconlight from "@/public/assets/light/logoutIcon.svg";
import burgerIcon from "@/public/assets/burgerIcon.svg";
import crossIcon from "@/public/assets/crossIcon.svg";

export default function SideBar() {
    const [menu, SetMenu] = useState(false);
    return (
        <section className="bg-light-gray md:p-3 md:fixed">
            <ul className="flex flex-col w-full items-center justify-center pt-5 h-screen mobile:hidden">
                <Image
                    src={crsLogo as string}
                    alt="crs logo"
                    style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        marginBottom: "35px",
                    }}
                />
                <div className="flex flex-col justify-start items-center h-full">
                    <NavigationItem to="/" itemIconDark={dashboardIcondark as string} itemIconLight={dashboardIconlight as string} itemText="Dashboard" />
                    <NavigationItem to="/video" itemIconDark={videoIcondark as string} itemIconLight={videoIconlight as string} itemText="Video" />
                    <NavigationItem to="/resources" itemIconDark={resourcesIcondark as string} itemIconLight={resourcesIconlight as string} itemText="Resources" />
                    <NavigationItem to="#" itemIconDark={queryIcondark as string} itemIconLight={queryIconlight as string} itemText="Query" />
                    <NavigationItem to="#" itemIconDark={standardIcondark as string} itemIconLight={standardIconlight as string} itemText="Standard" />
                    <NavigationItem to="/users" itemIconDark={userIcondark as string} itemIconLight={userIconlight as string} itemText="User’s" />
                </div>
                <div className="mb-2">
                    <NavigationItem to="#" itemIconDark={settingIcondark as string} itemIconLight={settingIconlight as string} itemText="Settings" />
                    <NavigationItem to="#" itemIconDark={logoutIcondark as string} itemIconLight={logoutIconlight as string} itemText="Logout" />
                </div>
            </ul>
            <ul onClick={() => SetMenu(!menu)} className="md:hidden bg-light-gray w-screen p-2">
                <div className="flex justify-between items-center">
                    <Image
                        src={crsLogo as string}
                        alt="crs logo"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                        }}
                    />
                    <Image
                        className="cursor-pointer"
                        src={menu ? (crossIcon as string) : (burgerIcon as string)}
                        alt="hameburger"
                        width={35}
                        height={35}
                    ></Image>
                </div>
                {
                    menu && (
                        <div>
                            <div className="flex flex-col justify-start items-center h-full">
                                <NavigationItem to="/" itemIconDark={dashboardIcondark as string} itemIconLight={dashboardIconlight as string} itemText="Dashboard" />
                                <NavigationItem to="/video" itemIconDark={videoIcondark as string} itemIconLight={videoIconlight as string} itemText="Video" />
                                <NavigationItem to="/resources" itemIconDark={resourcesIcondark as string} itemIconLight={resourcesIconlight as string} itemText="Resources" />
                                <NavigationItem to="#" itemIconDark={queryIcondark as string} itemIconLight={queryIconlight as string} itemText="Query" />
                                <NavigationItem to="#" itemIconDark={standardIcondark as string} itemIconLight={standardIconlight as string} itemText="Standard" />
                                <NavigationItem to="/users" itemIconDark={userIcondark as string} itemIconLight={userIconlight as string} itemText="User’s" />
                                <NavigationItem to="#" itemIconDark={settingIcondark as string} itemIconLight={settingIconlight as string} itemText="Settings" />
                                <NavigationItem to="#" itemIconDark={logoutIcondark as string} itemIconLight={logoutIconlight as string} itemText="Logout" />
                            </div>
                        </div>
                    )
                }
            </ul>
        </section>
    );
}
