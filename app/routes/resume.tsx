import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Ats from "~/components/Ats";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed Overview of your resume" },
];

const Resume = () => {
  const { id } = useParams();
  const { isLoading, auth, fs, kv } = usePuterStore();
  const [resumeUrl, setresumeUrl] = useState<string>("");
  const [imageUrl, setimageUrl] = useState("");
  const [feedback, setfeedback] = useState<Feedback | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate("/auth?next=/resume/" + id);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;
      const data = JSON.parse(resume);
      console.log(data)

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setresumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setimageUrl(imageUrl);

      setfeedback(data.feedback);
    };

    loadResume();
  }, [id]);
  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to={`/`} className="back-button">
          <img src="/icons/back.svg" alt="back" className="size-2.5" />
          <span className="text-sm font-semibold text-gray-800">
            Back to Home
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* Resume Display section */}
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt={"resume"}
                  className={"w-full h-full object-contain rounded-2xl"}
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* feedback section */}
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback}/>
                <Ats score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                <Details feedback={feedback}/>
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              alt="empty"
              className="w-full"
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
