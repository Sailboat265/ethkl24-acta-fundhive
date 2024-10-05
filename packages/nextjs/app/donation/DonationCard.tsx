import React from "react";
import Image from "next/image";

interface Campaign {
  name: string;
  overview: string;
  category: string;
  subCategory: string;
  fundingGoal: number;
  currentFunds: number;
  imageUrl: string;
}

interface DonationCardProps {
  campaign: Campaign;
}

const DonationCard: React.FC<DonationCardProps> = ({ campaign }) => {
  const { name, overview, category, fundingGoal, currentFunds, imageUrl } = campaign;

  // Calculate funding progress
  const progress = Math.min((currentFunds / fundingGoal) * 100, 100);

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      {/* Image */}
      <div className="relative">
        <Image src={imageUrl} alt={name} width={500} height={300} className="w-full h-40 object-cover" />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="mb-2">
          <h2 className="text-lg font-bold leading-tight text-gray-900 truncate">{name}</h2>
          <p className="text-xs text-gray-600">{category}</p>
        </div>

        {/* Short Overview */}
        <p className="text-sm text-gray-700 line-clamp-2">{overview}</p>

        {/* Progress and Funding Info */}
        <div className="mt-4">
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded">
            <div className="absolute top-0 left-0 h-full bg-green-500 rounded" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>{progress.toFixed(2)}% Funded</span>
            <span>{(fundingGoal - currentFunds).toFixed(2)} ETH Needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
