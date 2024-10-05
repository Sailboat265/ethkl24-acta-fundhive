"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type FormData = {
  projectName: string;
  projectOverview: string;
  category: string; // Keep as string for form input, will map to enum later
  subCategory: string; // Added subCategory to match contract
  pricePool: number;
};

export default function CreateProject() {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Project");

  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectOverview: "",
    category: "",
    subCategory: "", // Initialize subCategory
    pricePool: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "pricePool" ? Number(value) : value, // Ensure pricePool is a number
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Mapping category string to enum
    const categoryEnum = formData.category === "Donation" ? 0 : 1; // 0 for Donation, 1 for Crowdfund

    try {
      await writeYourContractAsync({
        functionName: "createProject",
        args: [
          formData.projectName,
          formData.projectOverview,
          categoryEnum, // Passing enum value to contract
          formData.subCategory, // Dynamic subCategory
          BigInt(formData.pricePool), // Pass pricePool as BigInt
        ],
      });
    } catch (e) {
      console.error("Error creating project:", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Create a New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        {/* Project Overview */}
        <div>
          <label className="block text-sm font-medium">Project Overview</label>
          <textarea
            name="projectOverview"
            value={formData.projectOverview}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            rows={6}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Donation">Donation</option>
            <option value="Crowdfund">Crowdfund</option>
          </select>
        </div>

        {/* SubCategory */}
        <div>
          <label className="block text-sm font-medium">SubCategory</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter SubCategory"
          />
        </div>

        {/* Price Pool */}
        <div>
          <label className="block text-sm font-medium">Price Pool (Scroll Sepiorra)</label>
          <input
            type="number"
            name="pricePool"
            value={formData.pricePool}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter Scroll Sepiorra amount"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
