"use client";

import { Slider } from "./ui/slider";
import { useScores } from "@/ScoreContext";

type Category = "marketing" | "financial" | "teamAssessment" | "product";

export default function ScoreSliders() {
  const { scores, setScores } = useScores();

  const handleScoreChange = (category: Category, newValue: number) => {
    setScores({
      ...scores,
      [category]: newValue,
    });
  };

  const categories: Category[] = [
    "marketing",
    "product",
    "teamAssessment",
    "financial",
  ];

  return (
    <div className="w-full max-w-md mx-auto p-2  shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-6 text-white">
        Scoring Configs
      </h2>
      {categories.map((category) => (
        <div key={category} className="">
          <label
            htmlFor={category}
            className="block text-xs font-medium text-white capitalize"
          >
            {category === "teamAssessment" ? "Team Assessment" : category}
          </label>
          <Slider
            id={category}
            min={0}
            max={1}
            step={0.01}
            value={scores[category]}
            onChange={(newValue) => handleScoreChange(category, newValue)}
          />
          <p className="text-xs text-white text-right">
            Weightage: {scores[category].toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
