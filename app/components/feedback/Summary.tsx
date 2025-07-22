import React from "react";
import ScoreGauze from "./ScoreGauze";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-500"
      : score > 50
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex gap-2 items-center">
          <span className="text-base sm:text-xl md:text-2xl font-medium w-fit">{title}</span>
          <ScoreBadge score={score} />
        </div>
        <ScoreGauze score={score} textColor={textColor} shrink={true} />
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  const textColor =
    feedback.overallScore > 70
      ? "text-green-500"
      : feedback.overallScore > 50
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauze score={feedback.overallScore} textColor={textColor} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based in the variables listed below
          </p>
        </div>
      </div>

      <Category title="Tone and Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
