"use client";

import { useState } from "react";
import DownloadCSV from "./downloadCSV";

type ProjectComparison = {
  project1: string;
  project2: string;
  selected_project: string;
  detailed_reasoning: string;
  risk_factors: string;
  recommendation_confidence: string;
  recommendation_confidence_explanation: string;
  marketing: number;
  product: number;
  team: number;
  finance: number;
  total_weighted_score: number;
};

const getMetricColor = (value: number) => {
  if (value >= 0.8) return "text-green-400";
  if (value >= 0.6) return "text-yellow-400";
  return "text-red-400";
};
export default function ProjectComparisonTable({
  projectsCompared,
  onSendMessage,
}: {
  projectsCompared: any;
  onSendMessage: (message: string, projects: any[]) => void;
}) {
  const [selectedComparison, setSelectedComparison] =
    useState<ProjectComparison | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleCheckboxChange = (comparison: any) => {
    // console.log(selectedProjects);
    setSelectedProjects((prev: any) => {
      const isSelected = prev.some(
        (project: any) =>
          project.project1 === comparison.project1 &&
          project.project2 === comparison.project2
      );

      if (isSelected) {
        return prev.filter(
          (project: any) =>
            !(
              project.project1 === comparison.project1 &&
              project.project2 === comparison.project2
            )
        );
      } else {
        return [...prev, comparison];
      }
    });
    // console.log(selectedProjects);
  };

  const comparisonsPerPage = 5;

  const totalPages = Math.ceil(projectsCompared.length / comparisonsPerPage);

  const indexOfLastComparison = currentPage * comparisonsPerPage;

  const indexOfFirstComparison = indexOfLastComparison - comparisonsPerPage;

  const currentComparisons = projectsCompared.slice(
    indexOfFirstComparison,
    indexOfLastComparison
  );

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "high":
        return "bg-green-600 text-green-100";
      case "medium":
        return "bg-yellow-600 text-yellow-100";
      case "low":
        return "bg-red-600 text-red-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const handleSendSelected = () => {
    if (selectedProjects.length === 0) return;

    const projectNames = selectedProjects
      .map((project: any) => `${project.selected_project}`)
      .join(", ");

    const message = `Please analyze these project comparisons: ${projectNames}`;
    onSendMessage(message, selectedProjects);
    setSelectedProjects([]); // Clear selection after sending
  };
  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 m-5 w-[950px]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Project Comparisons</h1>{" "}
        {selectedProjects.length > 0 && (
          <button onClick={handleSendSelected}>Click</button>
        )}
        <DownloadCSV jsonData={projectsCompared} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Project 1</th>
              <th className="px-4 py-2 text-left">Project 2</th>
              <th className="px-4 py-2 text-left">Selected Project</th>
              <th className="px-4 py-2 text-left">Confidence</th>
              <th className="px-4 py-2 text-left">Actions</th>
              <th className="px-4 py-2 text-left">Select</th>
            </tr>
          </thead>
          <tbody>
            {currentComparisons.map((comparison: any, index: any) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-4 py-2">
                  {indexOfFirstComparison + index + 1}
                </td>
                <td className="px-4 py-2">{comparison.project1}</td>
                <td className="px-4 py-2">{comparison.project2}</td>
                <td className="px-4 py-2">{comparison.selected_project}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${getConfidenceColor(
                      comparison.recommendation_confidence
                    )}`}
                  >
                    {comparison.recommendation_confidence}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedComparison(comparison)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Details
                  </button>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProjects.some(
                      (project: any) =>
                        project.project1 === comparison.project1 &&
                        project.project2 === comparison.project2
                    )}
                    onChange={() => handleCheckboxChange(comparison)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-700 disabled:text-gray-500"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-700 disabled:text-gray-500"
        >
          Next
        </button>
      </div>

      {selectedComparison && (
        <div className="mt-8 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Comparison</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Selected Project</h3>
              <p className="text-gray-300">
                {selectedComparison.selected_project}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detailed Reasoning</h3>
              <p className="text-gray-300">
                {selectedComparison.detailed_reasoning}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Risk Factors</h3>
              <p className="text-gray-300">{selectedComparison.risk_factors}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Marketing:</p>
                  <p className={getMetricColor(selectedComparison.marketing)}>
                    {selectedComparison.marketing.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Product:</p>
                  <p className={getMetricColor(selectedComparison.product)}>
                    {selectedComparison.product.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Team:</p>
                  <p className={getMetricColor(selectedComparison.team)}>
                    {selectedComparison.team.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Finance:</p>
                  <p className={getMetricColor(selectedComparison.finance)}>
                    {selectedComparison.finance.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
