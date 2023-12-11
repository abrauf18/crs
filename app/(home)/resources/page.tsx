import React from "react";
import Filters from "@/components/common/Filters";
import Header from "@/components/common/Header";
import ResourcesTable, { Resource } from "@/components/resources/ResourcesTable";
import resourcesIcon from "@/public/assets/dark/resourcesIcon.svg";

export const ResourcesData: Resource[] = [
    {
        id: 1,
        name: "XYZ Resources",
        type: "Video",
        topic: "Topic 1",
    },
    {
        id: 2,
        name: "XYZ Resources",
        type: "Video",
        topic: "Topic 2"
    },
    {
        id: 3,
        name: "XYZ Resources",
        type: "Quiz",
        topic: "Topic 2",
    },
    {
        id: 4,
        name: "XYZ Resources",
        type: "Quiz",
        topic: "Topic 2"
    },
    {
        id: 5,
        name: "XYZ Resources",
        type: "WorkSheet",
        topic: "Topic 3",
    },
    {
        id: 6,
        name: "XYZ Resources",
        type: "SlideShow",
        topic: "Topic 3"
    },
    {
        id: 7,
        name: "XYZ Resources",
        type: "SlideShow",
        topic: "Topic 3"
    },
];
const ResouresPage = () => {
    return (
        <>
            <Header headerText="All Resources" iconSrc={resourcesIcon as string} tagline="Your All Resources Here" />
            <div className="rounded-lg border-[1px] mt-5 py-3 md:px-6 mobile:px-3">
                <Filters text="Resources" />
                <ResourcesTable resources={ResourcesData} />
            </div>
        </>
    );
};

export default ResouresPage;