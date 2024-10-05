"use client";

import { useState } from "react";
import { NextPage } from "next";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// Define the available subcategories based on the enum from the smart contract
const subCategoryOptions = [
  { label: "Art", value: 0 },
  { label: "Food", value: 1 },
  { label: "Music", value: 2 },
  { label: "Games", value: 3 },
  { label: "Design", value: 4 },
  { label: "Null", value: 5 },
];

const CreateCampaign: NextPage = () => {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    overview: "",
    category: "Donation", // Default category
    subCategory: "0", // Default to Art (index 0 in the enum)
    fundingGoal: "", // In ETH, converted to Wei
  });

  const { name, overview, category, subCategory, fundingGoal } = formData;

  // Scaffold-ETH write contract hook
  const { writeContractAsync: writeAsync } = useScaffoldWriteContract("Project");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handler wrapped inside button
  const handleCreateProject = async () => {
    if (!name || !overview || !fundingGoal || isNaN(parseFloat(fundingGoal)) || parseFloat(fundingGoal) <= 0) {
      alert("Please fill in all required fields with valid information.");
      return;
    }

    try {
      // Call the contract to create the project
      await writeAsync({
        functionName: "createProject",
        args: [
          name, // Campaign name
          overview, // Campaign overview
          category === "Donation" ? 0 : 1, // Category: 0 for Donation, 1 for Crowdfunding
          parseInt(subCategory), // Sub-category as an integer based on the enum index
          parseEther(fundingGoal), // Goal in ETH (converted to Wei)
        ],
      });
      alert("Campaign created successfully!");

      // Reset form after submission
      setFormData({
        name: "",
        overview: "",
        category: "Donation",
        subCategory: "0", // Reset to the default category
        fundingGoal: "",
      });
    } catch (e) {
      console.error("Error creating campaign:", e);
      alert("Failed to create campaign.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-300 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8 text-center">
        Create a New Campaign
      </h1>

      <form>
        {/* Campaign Name */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter campaign name"
            required
          />
        </div>

        {/* Overview */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Overview</label>
          <textarea
            name="overview"
            value={overview}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your campaign"
            rows={4}
            required
          />
        </div>

        {/* Category (Donation or Crowdfunding) */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Donation">Donation</option>
            <option value="Crowdfund">Crowdfund</option>
          </select>
        </div>

        {/* Sub-Category */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Sub-Category</label>
          <select
            name="subCategory"
            value={subCategory}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {subCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Goal */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Funding Goal (ETH)</label>
          <input
            type="number"
            name="fundingGoal"
            value={fundingGoal}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter funding goal in ETH"
            required
          />
        </div>
      </form>

      {/* Submit Button with contract write logic */}
      <button
        className="w-full py-3 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleCreateProject}
      >
        Create Campaign
      </button>
    </div>
  );
};

export default CreateCampaign;
