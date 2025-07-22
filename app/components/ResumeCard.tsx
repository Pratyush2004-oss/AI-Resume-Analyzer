import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath, resumePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setresumeUrl] = useState("");
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;

      let url = URL.createObjectURL(blob);
      setresumeUrl(url);
    };
    loadResume();
  }, []);
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-100"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName ? (
            <h2 className="text-black font-bold break-words">{companyName}</h2>
          ) : (
            <h2 className="text-black font-bold break-words">Resume</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!jobTitle && !companyName && (
            <h2 className="font-bold !text-black">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt={jobTitle}
              className="w-full h-[350px] max-sm:h-[200px] rounded-2xl object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
