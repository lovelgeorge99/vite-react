import { createContext, useContext, ReactNode, useState } from "react";

interface Scores {
  [key: string]: number;
}

interface ScoresContextType {
  scores: Scores;
  setScores: (scores: Scores) => void;
}

const ScoresContext = createContext<ScoresContextType | undefined>(undefined);

export function ScoresProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<Scores>({
    marketing: 0.4,
    product: 0.3,
    teamAssessment: 0.2,
    financial: 0.1,
  });
  //   console.log(scores, "score changed");

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
}

export function useScores() {
  const context = useContext(ScoresContext);
  if (context === undefined) {
    throw new Error("useScores must be used within a ScoresProvider");
  }
  return context;
}
