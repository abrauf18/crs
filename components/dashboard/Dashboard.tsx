import React from "react";
import Header from "../common/Header";
import wavinghand from "@/public/assets/wavinghand.svg";
import Card from "../common/Card";
import userIcon from "@/public/assets/coloredIcons/userIcon.svg";
import videoIcon from "@/public/assets/coloredIcons/videoIcon.svg";
import resourcesIcon from "@/public/assets/coloredIcons/resourcesIcon.svg";
import dataIcon from "@/public/assets/coloredIcons/dataIcon.svg";
import Filters from "../common/Filters";
import Image from "next/image";
import graph from "@/public/assets/graph.svg";
import UsersTable from "../users/UsersTable";
import { usersData } from "@/app/(home)/users/page";
import ResourcesTable from "../resources/ResourcesTable";
import { ResourcesData } from "@/app/(home)/resources/page";

const Dashboard = () => {
    return (
        <section className="flex flex-col w-full scroll-smooth mobile:mt-12">
            <Header headerText="Hello John Doe!" tagline="Here’s a Quick Overview" iconSrc={wavinghand as string} />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mobile:place-items-center">
                <Card icon={userIcon as string} cardText="Total User’s" count="20K" />
                <Card icon={videoIcon as string} cardText="Video Uploads" count={200} isActive={true} />
                <Card icon={resourcesIcon as string} cardText="Total Resources" count={150} />
                <Card icon={dataIcon as string} cardText="Data Insights" count="70%" />
            </div>
            <Filters text="Overall Performance" />
            <div className="w-auto ">
                <Image
                    src={graph as string}
                    alt="icon"
                    className="w-full"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 mt-5">
                <div className="border-[1px] rounded-lg p-5">
                    <h1 className="text-[20px] font-semibold">User’s</h1>
                    <UsersTable users={usersData} fontSize="12" />
                </div>
                <div className="border-[1px] rounded-lg p-5">
                    <h1 className="text-[20px] font-semibold">Resources</h1>
                    <ResourcesTable resources={ResourcesData} fontSize="12" />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
