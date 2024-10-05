"use client";

import AdminSidebar from "../components/adminsidebar";

export default function ManageCampaignPage() {
  return (
    <div className="flex">
      <AdminSidebar /> {/* Render the sidebar */}
      <div className="flex-grow p-6">
        {" "}
        {/* Main content area */}
        <h1 className="text-3xl font-bold mb-4">Manage Campaigns</h1>
        <p>This section is for managing campaigns.</p>
      </div>
    </div>
  );
}
