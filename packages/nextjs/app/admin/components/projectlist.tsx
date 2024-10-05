"use client";

import { useScaffoldEventHistory, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ProjectList = () => {
  const { data: projectsHistory, isLoading } = useScaffoldEventHistory({
    contractName: "Project", // Replace with your contract name
    eventName: "ProjectCreated", // The event you want to listen to
    fromBlock: BigInt(process.env.NEXT_PUBLIC_PROJECT_SMART_CONTRACT_BLOCKID ?? 0), // Start fetching events from block 0
    watch: true, // Watch for new events
    blockData: true,
  });

  const { writeContractAsync: changeProjectStatus } = useScaffoldWriteContract("Project");

  const handleStatusChange = async (creator: string, projectId: number, newStatus: number) => {
    try {
      await changeProjectStatus({
        functionName: "changeProjectStatus",
        args: [creator, BigInt(projectId), newStatus],
      });
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
      {!projectsHistory || projectsHistory.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ProjectID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Funding Goal</th>
              <th className="border border-gray-300 px-4 py-2">Creator</th>
              <th className="border border-gray-300 px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {projectsHistory.map((event, index) => {
              const projectId = event.args?.projectId ? Number(event.args.projectId) : 0;
              const creator = event.args?.creator ? event.args.creator.toString() : "Unknown";

              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{projectId}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.args?.name || "Unnamed Project"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {event.args?.fundingGoal ? event.args.fundingGoal.toString() : "0"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{creator}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div>
                      <button
                        onClick={() => handleStatusChange(creator, projectId, 1)}
                        className="bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(creator, projectId, 2)}
                        className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectList;
