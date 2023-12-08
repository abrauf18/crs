/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
        <>
            <ul className="flex flex-col w-full bg-light-gray items-center justify-center pt-5 h-screen mobile:hidden">
                <Image
                    src={crsLogo}
                    alt="crs logo"
                    style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        marginBottom: "35px",
                    }}
                />
                <div className="flex flex-col justify-start items-center h-full">
                    <NavigationItem to="/" itemIconDark={dashboardIcondark} itemIconLight={dashboardIconlight} itemText="Dashboard" />
                    <NavigationItem to="#" itemIconDark={videoIcondark} itemIconLight={videoIconlight} itemText="Video" />
                    <NavigationItem to="#" itemIconDark={resourcesIcondark} itemIconLight={resourcesIconlight} itemText="Resources" />
                    <NavigationItem to="#" itemIconDark={queryIcondark} itemIconLight={queryIconlight} itemText="Query" />
                    <NavigationItem to="#" itemIconDark={standardIcondark} itemIconLight={standardIconlight} itemText="Standard" />
                    <NavigationItem to="#" itemIconDark={userIcondark} itemIconLight={userIconlight} itemText="User’s" />
                </div>
                <div className="mb-2">
                    <NavigationItem to="#" itemIconDark={settingIcondark} itemIconLight={settingIconlight} itemText="Settings" />
                    <NavigationItem to="#" itemIconDark={logoutIcondark} itemIconLight={logoutIconlight} itemText="Logout" />
                </div>
            </ul>
            <ul onClick={() => SetMenu(!menu)} className="tablet:hidden bg-light-gray w-screen p-2">
                <div className="flex justify-between items-center">
                    <Image
                        src={crsLogo}
                        alt="crs logo"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                        }}
                    />
                    <Image
                        className="cursor-pointer"
                        src={menu ? crossIcon : burgerIcon}
                        alt="hameburger"
                        width={35}
                        height={35}
                    ></Image>
                </div>
                {
                    menu && (
                        <div>
                            <div className="flex flex-col justify-start items-center h-full">
                                <NavigationItem to="/" itemIconDark={dashboardIcondark} itemIconLight={dashboardIconlight} itemText="Dashboard" />
                                <NavigationItem to="#" itemIconDark={videoIcondark} itemIconLight={videoIconlight} itemText="Video" />
                                <NavigationItem to="#" itemIconDark={resourcesIcondark} itemIconLight={resourcesIconlight} itemText="Resources" />
                                <NavigationItem to="#" itemIconDark={queryIcondark} itemIconLight={queryIconlight} itemText="Query" />
                                <NavigationItem to="#" itemIconDark={standardIcondark} itemIconLight={standardIconlight} itemText="Standard" />
                                <NavigationItem to="#" itemIconDark={userIcondark} itemIconLight={userIconlight} itemText="User’s" />
                                <NavigationItem to="#" itemIconDark={settingIcondark} itemIconLight={settingIconlight} itemText="Settings" />
                                <NavigationItem to="#" itemIconDark={logoutIcondark} itemIconLight={logoutIconlight} itemText="Logout" />
                            </div>
                        </div>
                    )
                }
            </ul>
        </>
    );
}
