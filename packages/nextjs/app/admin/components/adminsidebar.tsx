// app/admin/components/AdminSidebar.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const currentPath = usePathname(); // Get the current pathname

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-0">
      <h2 className="text-xl font-bold mb-4 px-5 pt-5">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link href="/admin/manage_user">
            <div
              className={`w-full p-4 rounded-lg transition flex items-center justify-center 
              ${currentPath === "/admin/manage_user" ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-500"}`}
            >
              <span className="text-lg">Manage Users</span> {/* Increased font size */}
            </div>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/admin/manage_campaign">
            <div
              className={`w-full p-4 rounded-lg transition flex items-center justify-center 
              ${currentPath === "/admin/manage_campaign" ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-500"}`}
            >
              <span className="text-lg">Manage Campaigns</span> {/* Increased font size */}
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
