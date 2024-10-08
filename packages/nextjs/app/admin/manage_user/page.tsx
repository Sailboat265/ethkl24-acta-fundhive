"use client";

import AdminSidebar from "../components/adminsidebar";
import UserList from "../components/userlist";
import RequireAdmin from "../components/RequireAdmin";

export default function ManageUserPage() {
  return (
    <RequireAdmin>
      <div className="flex">
        <AdminSidebar /> {/* Render the sidebar */}
        <div className="flex-grow p-6">
          {" "}
          {/* Main content area */}
          <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
          <UserList /> {/* Render the user list */}
        </div>
      </div>
    </RequireAdmin>
  );
}
