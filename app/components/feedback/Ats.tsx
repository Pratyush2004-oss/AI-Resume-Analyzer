import { cn } from "~/lib/utils";

const Ats = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions:
    | {
        type: "good" | "improve";
        tip: string;
      }[]
    | [];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
        score > 69
          ? "from-green-100"
          : score > 49
          ? "from-yellow-100"
          : "from-red-100"
      )}
    >
      <div className="flex gap-4 items-center ">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 4945
              ? "/icons/ats-warning.svg"
              : "/icons/ats-bad.svg"
          }
          alt="ats"
          className="size-10"
        />
        <p className="text-2xl font-semibold">Ats Score - {score}/100</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl">
          How well does your Resume pass through Applicant Tracking System?
        </p>
        <p className="text-lg text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="size-10"
            />
            <p
              className={cn(
                suggestion.type === "good"
                  ? "text-green-600"
                  : "text-yellow-600",
                "font-medium sm:text-lg"
              )}
            >
              {suggestion.tip}
            </p>
          </div>
        ))}
        <p className="text-lg text-gray-500">
          Want a better score? Improve your resume by applying these suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default Ats;
