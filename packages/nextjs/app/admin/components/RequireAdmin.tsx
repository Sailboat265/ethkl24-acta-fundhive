"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { address, isConnected } = useAccount();
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: isAdminData } = useScaffoldReadContract({
    contractName: "UserRegistry",
    functionName: "isAdmin",
    args: [address],
  });

  useEffect(() => {
    if (isConnected && isAdminData) {
      setIsAdmin(isAdminData);
    }
  }, [isConnected, isAdminData]);

  if (!isConnected) {
    return <div>Please connect your wallet to access this content.</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        Access Denied: You must be an admin to view this content.
        <div>Connected Address: {address}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
