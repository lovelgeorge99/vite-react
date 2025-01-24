import React from "react";

interface ScrollableProjectsProps {
  projects: string[];
}

const ScrollableProjects: React.FC<ScrollableProjectsProps> = ({
  projects,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Project List</h2>
      <div className="h-56 overflow-y-auto border border-gray-300 rounded-md p-4 shadow-md">
        {projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li
                key={index}
                className="bg-black px-4 py-2 rounded  text-white"
              >
                {index + 1 + ". "}
                {project}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects to display.</p>
        )}
      </div>
    </div>
  );
};

export default ScrollableProjects;
