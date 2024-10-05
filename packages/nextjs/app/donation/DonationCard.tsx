import React from "react";
import { Address } from "~~/components/scaffold-eth";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth"; 

// Define the props for the DonationCard
interface DonationCardProps {
  name: string;
  overview: string;
  fundingGoal: string;
  creator: string;
  projectId: number | bigint;
}

const DonationCard: React.FC<DonationCardProps> = ({ name, overview, fundingGoal, creator, projectId }) => {
  // Calculate the percentage progress
  const progress = (0 / parseFloat(fundingGoal)) * 100;

  // Scaffold-ETH write contract hook for donations
  const { writeContractAsync: writeAsync } = useScaffoldWriteContract("Project");

  // Donate handler
  const handleDonate = async () => {
    try {
        const projectIdBigInt = BigInt(projectId);
      // Call the donateToProject function with projectId and value (e.g., 0.1 ETH)
      writeAsync({
        functionName: "donateToProject",
        args: [creator, projectIdBigInt],
        value: parseEther("0.1"), // Goal in ETH (not transferred, just stored)
      });
    } catch (e) {
      console.error("Error donating:", e);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
      {/* Project Name */}
      <h4 className="text-2xl font-semibold">{name}</h4>

      {/* Overview */}
      <p className="mt-2 text-sm text-gray-400 truncate">{overview}</p>

      {/* Funding Goal */}
      <p className="mt-2">Goal: {(fundingGoal / 10 ** 18).toFixed(2)} ETH</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="relative w-full h-4 bg-gray-700 rounded">
          <div className="absolute top-0 left-0 h-full bg-green-500 rounded" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-sm text-gray-400">{progress.toFixed(2)}% of goal</p>
      </div>

      {/* Creator's Avatar and Address */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Creator:</p>
        <Address address={creator} />
      </div>

      {/* Donate Button */}
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleDonate}>
        Donate 0.1 ETH
      </button>
    </div>
  );
};

export default DonationCard;
