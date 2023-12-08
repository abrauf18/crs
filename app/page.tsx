import Dashboard from "@/components/dashboard/Dashboard";
import SideBar from "@/components/sidebar/Sidebar";
import React from "react";
export default function
  Home() {
  return (
    <section className="flex mobile:flex-col">
      <div className="md:basis-[280px]">
        <SideBar />
      </div>
      <div className="md:basis-full p-6">
        <Dashboard />
      </div>
    </section>
  );
}
