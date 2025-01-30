import React from "react";
import DownloadCSV from "./downloadCSV";

interface ScrollableProjectsProps {
  projects: string[];
}

const ScrollableProjects: React.FC<ScrollableProjectsProps> = ({
  projects,
}) => {
  const columns = projects.length > 0 ? Object.keys(projects[0]) : [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-center mb-4">Project List</h2>
        <DownloadCSV jsonData={projects} />
      </div>

      <div className="h-80 min-w-[800px] overflow-y-auto border border-gray-300 rounded-md p-4 shadow-md">
        {projects.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {column.replace(/_/g, " ").toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-300 px-4 py-2 text-gray-800"
                    >
                      {(project as any)[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No projects to display.</p>
        )}
      </div>
    </div>
  );
};

export default ScrollableProjects;
