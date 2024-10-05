"use client";

import React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth"; // Adjust the path as per your project structure
import DonationCard from "./DonationCard";

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
          const projectId = event.args?.projectId ? Number(event.args.projectId) : 0;
          const name = event.args?.name ? event.args.name.toString() : "Unnamed Project";
          const overview = event.args?.overview ? event.args.overview.toString() : "No overview available.";
          const fundingGoal = event.args?.fundingGoal ? event.args.fundingGoal.toString() : "0";
          const creator = event.args?.creator ? event.args.creator.toString() : "Unknown";

          return (
            <DonationCard
              key={index} 
              projectId={projectId}
              name={name}
              overview={overview}
              fundingGoal={fundingGoal}
              creator={creator}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
