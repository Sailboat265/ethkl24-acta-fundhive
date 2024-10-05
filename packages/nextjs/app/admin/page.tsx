// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

// app/admin/page.tsx

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
    return <div>Please connect your wallet.</div>;
  }

  if (!isAdmin) {
    return (
      <>
        <div>Access Denied: You must be an admin to view this page.</div>
        <div>{address}</div>
      </>
    );
  }

  return (
    <div>
      <h1>Welcome, Admin</h1>
      {/* Admin-specific components go here */}
    </div>
  );
}
