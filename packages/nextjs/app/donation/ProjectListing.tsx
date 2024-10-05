"use client";

import React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth"; // Adjust the path as per your project structure

const ProjectList: React.FC = () => {
  // Fetch the event history for the "ProjectCreated" event
  const { data: eventHistory, isLoading } = useScaffoldEventHistory({
    contractName: "Project", // Replace with your contract name
    eventName: "ProjectCreated", // The event you want to listen to
    fromBlock: 6882328n, // Start fetching events from block 0
    watch: true, // Watch for new events
  });

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state if data is being fetched
  }

  if (!eventHistory || eventHistory.length === 0) {
    return <div>No projects found.</div>; // Handle no projects scenario
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-8">List of Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventHistory.map((event, index) => {
          const { projectId, name, overview, fundingGoal, creator } = event.args;

          return (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold">{name}</h4>
              <p className="mt-2">Overview: {overview}</p>
              <p className="mt-2">Goal: {fundingGoal} ETH</p>
              <p className="mt-2">Created by: {creator}</p>
              <p className="mt-2">Project ID: {projectId}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
