    import React, { useState } from "react"; // Import useState
    import { parseEther } from "viem";
    import { Address } from "~~/components/scaffold-eth";
    import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

    // Define the props for the DonationCard
    interface DonationCardProps {
      name: string;
      overview: string;
      fundingGoal: string;
      creator: string;
      projectId: number | bigint;
      category: number; // Change type to number for easier mapping
      status: number; // Change this to 'status' (lowercase)
    }

    const DonationCard: React.FC<DonationCardProps> = ({
                                                         name,
                                                         overview,
                                                         fundingGoal,
                                                         creator,
                                                         projectId,
                                                         category, // Accept category as number
                                                         status, // Use status (lowercase) here
                                                       }) => {
      // State for donation amount
      const [donationAmount, setDonationAmount] = useState<string>("");

      // Calculate the percentage progress
      const progress = (0 / parseFloat(fundingGoal)) * 100;

      // Scaffold-ETH write contract hook for donations
      const { writeContractAsync: writeAsync } = useScaffoldWriteContract("Project");

      // Donate handler
      const handleDonate = async () => {
        try {
          const projectIdBigInt = BigInt(projectId);
          // Convert the donation amount to Ether
          const value = parseEther(donationAmount);
          // Call the donateToProject function with projectId and value
          await writeAsync({
            functionName: "donateToProject",
            args: [creator, projectIdBigInt],
            value: value,
          });
          // Clear the input after donation
          setDonationAmount("");
        } catch (e) {
          console.error("Error donating:", e);
        }
      };

      // Helper functions to map category and status
      const getCategoryString = (category: number) => {
        return category === 0 ? "Donation" : "Crowdfund";
      };

      const getStatusString = (status: number) => {
        if (status === 0) return "Pending";
        if (status === 1) return "Approved";
        if (status === 2) return "Rejected";
        return "Unknown"; // In case of unexpected values
      };

      return (
          <div className="card-wrapper mx-auto mt-4 max-w-lg">
              <div className="card">
                  {/* Front side of the card */}
                  <div
                      className="card-front bg-gray-900 p-4 rounded-lg shadow-md transition-all duration-300 flex flex-col">
                      {/* Name starts at the top */}
                      <h4 className="text-2xl font-semibold text-center">{name}</h4>

                      {/* Push overview to start from the middle */}
                      <div className="flex-grow flex items-center justify-center">
                          <p className="text-sm text-gray-400 text-center overflow-hidden text-ellipsis w-3/4 line-clamp-3">
                              {overview}
                          </p>
                      </div>

                      {/* Category and Status */}
                      <div className="mt-2 text-sm text-gray-300 text-center">
                          <p>Category: {getCategoryString(category)}</p>
                          <p>Status: {getStatusString(status)}</p>
                      </div>
                  </div>

                  {/* Back side of the card */}
                  <div className="card-back bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300">
                      {/* Name and Overview (same as front) */}
                      <h4 className="text-xl font-semibold text-center">{name}</h4>
                      <p className="text-sm text-gray-400 text-center overflow-hidden text-ellipsis w-3/4 line-clamp-3">
                          {overview}
                      </p>

                      {/* Funding Goal */}
                      <p className="mt-4">Goal: {(parseFloat(fundingGoal) / 10 ** 18).toFixed(2)} ETH</p>

                      {/* Progress Bar */}
                      <div className="mt-4">
                          <div className="relative w-full h-4 bg-gray-700 rounded">
                              <div className="absolute top-0 left-0 h-full bg-green-500 rounded"
                                   style={{width: `${progress}%`}}/>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{progress.toFixed(2)}% of goal</p>
                      </div>

                      {/* Creator's Avatar and Address */}
                      <div className="mt-4">
                          <p className="text-sm text-gray-500">Creator:</p>
                          <Address address={creator}/>
                      </div>

                      {/* Donation Amount Input and Button Side by Side */}
                      <div className="mt-4 flex space-x-2">
                          <input
                              type="text"
                              placeholder="Amount in ETH"
                              value={donationAmount}
                              onChange={(e) => setDonationAmount(e.target.value)}
                              className="p-2 w-full border border-gray-400 rounded"
                          />
                          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                  onClick={handleDonate}>
                              Donate
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      );
    };

    export default DonationCard;
