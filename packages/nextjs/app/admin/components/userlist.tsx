"use client";

import { useEffect, useState } from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const UserList = () => {
  // Fetch all historical UserRegistered events
  // @ts-ignore
  const { data, isLoading } = useScaffoldEventHistory({
    contractName: "UserRegistry",
    eventName: "UserRegistered",
    fromBlock: BigInt(process.env.NEXT_PUBLIC_USER_REGISTRY_SMART_CONTRACT_BLOCKID ?? 0), // To get events from the genesis block (or you can specify a block number to optimize performance)
    blockData: true,
  });

  const [userList, setUserList] = useState<{ walletAddress: string; username: string; email: string }[]>([]);

  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((event: any) => ({
        walletAddress: event.args.walletAddress,
        username: event.args.username,
        email: event.args.email,
      }));
      setUserList(formattedUsers);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
      {userList.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">No.</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Wallet Address</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.walletAddress}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.walletAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
