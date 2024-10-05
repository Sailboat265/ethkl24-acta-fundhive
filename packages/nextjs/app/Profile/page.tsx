"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Define the structure of a single project
interface Project {
  projectId: number;
  name: string;
  status: number;
}

// Update the UserProfile interface to include projects
interface UserProfile {
  userName: string | undefined;
  email: string | undefined;
  walletAddress: string | undefined;
  projects: Project[]; // Add projects here
}

// Enum mapping of project status
const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Verified";
    case 2:
      return "Rejected";
    default:
      return "Unknown";
  }
};

const UserProfilePage: React.FC = () => {
  const { address } = useAccount(); // Fetch wallet address using wagmi hook
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch user email from the contract
  const { data: userEmail } = useScaffoldReadContract({
    contractName: "UserRegistry",
    functionName: "getEmail",
    args: [address],
  });

  // Fetch user name from the contract
  const { data: userName } = useScaffoldReadContract({
    contractName: "UserRegistry",
    functionName: "getName",
    args: [address],
  });

  // Fetch user projects from the contract
  const { data: userProjects } = useScaffoldReadContract({
    contractName: "Project", // Replace with the actual contract name
    functionName: "getProjects",
    args: [address],
  });

  // Create block explorer link based on the wallet address
  const blockExplorerLink = address ? `https://etherscan.io/address/${address}` : "#";

  useEffect(() => {
    // Check if all necessary data has been fetched
    if (userEmail && userName && address) {
      // Default userProjects to an empty array if it doesn't exist
      const projectsData = userProjects ? userProjects : [];

      // Map over the readonly projects and convert to mutable array + bigint to number conversion
      const mappedProjects: Project[] = (
        projectsData as readonly { projectId: bigint; name: string; status: number }[] // Handle case when projects are undefined
      ).map(project => ({
        projectId: Number(project.projectId), // Convert bigint to number
        name: project.name,
        status: project.status,
      }));

      const profileData: UserProfile = {
        userName: userName as string,
        email: userEmail as string,
        walletAddress: address,
        projects: mappedProjects, // Set the converted projects or empty array
      };
      setUserProfile(profileData);
    }
  }, [userEmail, userName, address, userProjects]);

  if (!userProfile) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>User Profile</h2>

      {/* Profile Section */}
      <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "20px", marginBottom: "20px" }}>
        <h3>Profile Details</h3>
        <p><strong>User Name:</strong> {userProfile.userName}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Wallet Address:</strong> {userProfile.walletAddress}</p>
      </div>

      {/* Projects Section */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>User Projects</strong></p>
        {userProfile.projects.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {userProfile.projects.map(project => (
              <div
                key={project.projectId}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <p><strong>Project ID:</strong> {project.projectId}</p>
                <p className="projectName"><strong>Name:</strong> {project.name}</p>
                <p><strong>Status:</strong> {getStatusLabel(project.status)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginBottom: "30px" }}>No projects found.</p>
        )}
      </div>

      {/* Funding Section */}
      <div style={{ marginBottom: "30px" }}>
        <p><strong>User Past Fundings</strong></p>
        <p>
          To view transaction history of the user, please navigate to the Block Explorer.
        </p>
        <a
          href={blockExplorerLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#4f46e5", // TailwindCSS indigo-600
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View on Block Explorer
        </a>
      </div>
    </div>
  );
};

export default UserProfilePage;
