import React from "react";

// Define the project data type
type Project = {
  id: number;
  name: string;
  goal: string;
  status: string;
  creator: string;
};

interface ProjectListProps {
  projects: {
    live: Project[];
    fullyFunded: Project[];
    closed: Project[];
  };
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      {/* Project Categories and Search */}
      <div className="px-5 py-6">
        <h2 className="text-center text-xl font-bold mb-4">Crowdfunding Projects</h2>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search projects"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
          />
        </div>
        <div className="flex justify-center space-x-2 mb-8">
          {["art", "gaming", "ic-projects", "music", "supernova", "web3", "charity", "other"].map(category => (
            <button key={category} className="px-4 py-2 border border-gray-300 rounded-full">
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Live Projects Section */}
      <section id="live" className="px-5 py-6">
        <h3 className="text-2xl font-bold mb-4">Live Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.live.length > 0 ? (
            projects.live.map(project => (
              <div key={project.id} className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{project.name}</h4>
                <p className="mt-2">{project.goal} goal</p>
                <p className="mt-2 text-blue-600">{project.status}</p>
                <p className="mt-2 text-sm text-gray-500">by {project.creator}</p>
              </div>
            ))
          ) : (
            <p>No live projects in this section.</p>
          )}
        </div>
      </section>

      {/* Fully Funded Projects Section */}
      <section id="funded" className="px-5 py-6">
        <h3 className="text-2xl font-bold mb-4">Fully Funded Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.fullyFunded.map(project => (
            <div key={project.id} className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">{project.name}</h4>
              <p className="mt-2">{project.goal} goal</p>
              <p className="mt-2 text-green-600">{project.status}</p>
              <p className="mt-2 text-sm text-gray-500">by {project.creator}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closed Projects Section */}
      <section id="closed" className="px-5 py-6">
        <h3 className="text-2xl font-bold mb-4">Closed Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.closed.map(project => (
            <div key={project.id} className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">{project.name}</h4>
              <p className="mt-2">{project.goal} goal</p>
              <p className="mt-2 text-red-600">{project.status}</p>
              <p className="mt-2 text-sm text-gray-500">by {project.creator}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
