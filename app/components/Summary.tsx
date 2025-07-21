import React from "react";
import ScoreGauze from "./ScoreGauze";

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauze score={feedback.overallScore} />
      </div>
    </div>
  );
};

export default Summary;
