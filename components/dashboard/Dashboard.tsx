import React from "react";
import Header from "../common/Header";
import wavinghand from "@/public/assets/wavinghand.svg";
import Card from "../common/Card";
import userIcon from "@/public/assets/userIcon.svg";
import videoIcon from "@/public/assets/videoIcon.svg";
import resourcesIcon from "@/public/assets/resourcesIcon.svg";
import dataIcon from "@/public/assets/dataIcon.svg";

const Dashboard = () => {
    return (
        <section className="flex flex-col w-full">
            <Header headerText="Hello John Doe!" tagline="Here’s a Quick Overview" iconSrc={wavinghand as string} />
            <div className="grid mobile:grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mobile:place-items-center">
                <Card icon={userIcon as string} cardText="Total Videos" count="20K" />
                <Card icon={videoIcon as string} cardText="Video Uploads" count={200} isActive={true} />
                <Card icon={resourcesIcon as string} cardText="Total Resources" count={150} />
                <Card icon={dataIcon as string} cardText="Data Insights" count="70%" />
            </div>
        </section>
    );
};

export default Dashboard;