"use client";

import RequireAdmin from "./components/RequireAdmin";
import AdminSidebar from "./components/adminsidebar";

// Import the RequireAdmin component

export default function AdminPage() {
  return (
    <RequireAdmin>
      <div className="flex">
        <AdminSidebar /> {/* Render the AdminSidebar */}
        <div className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
          <p>Here you can manage users, campaigns, and more.</p>
        </div>
      </div>
    </RequireAdmin>
  );
}
