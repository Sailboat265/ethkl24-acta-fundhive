"use client";

import RequireAdmin from "../components/RequireAdmin";
import AdminSidebar from "../components/adminsidebar";
import ProjectList from "../components/projectlist";

export default function ManageUserPage() {
  return (
    <RequireAdmin>
      <div className="flex">
        <AdminSidebar /> {/* Render the sidebar */}
        <div className="flex-grow p-6">
          {" "}
          {/* Main content area */}
          <h1 className="text-3xl font-bold mb-4">Manage Projects</h1>
          <ProjectList /> {/* Render the user list */}
        </div>
      </div>
    </RequireAdmin>
  );
}
