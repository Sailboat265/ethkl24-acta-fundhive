"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "./components/adminsidebar";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: isAdminData } = useScaffoldReadContract({
    contractName: "UserRegistry",
    functionName: "isUserExist",
    args: [address],
  });

  useEffect(() => {
    if (isConnected && isAdminData) {
      setIsAdmin(isAdminData);
    }
  }, [isConnected, isAdminData]);

  if (!isConnected) {
    return <div>Please connect your wallet to access the admin panel.</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        Access Denied: You must be an admin to view this page.
        <div>Connected Address: {address}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar /> {/* Render the AdminSidebar */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p>Here you can manage users, campaigns, and more.</p>
      </div>
    </div>
  );
}
