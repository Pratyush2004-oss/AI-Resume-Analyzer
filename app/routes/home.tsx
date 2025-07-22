import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setresumes] = useState<Resume[]>([]);
  const [loadingResumes, setloadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setloadingResumes(true);
      try {
        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumes?.map(
          (resume) => JSON.parse(resume.value) as Resume
        );
        setresumes(parsedResumes);
      } catch (error) {
      } finally {
        setloadingResumes(false);
      }
    };
    loadResumes();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No Resumes Found. Upload your first resume to get started</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedbacks</h2>
          )}
        </div>
        {!loadingResumes ? (
          resumes.length > 0 ? (
            <>
              <div className="resumes-section">
                {resumes.map((resume: Resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center flex-col justify-center mt-10">
              <button
                onClick={() => navigate("/upload")}
                className="primary-button px-10 py-5"
              >
                <p className="text-3xl font-medium">Upload your first resume</p>
              </button>
            </div>
          )
        ) : (
          <div className="loading-resumes">
            <img src="/images/resume-scan-2.gif" alt="scan" className="w-52" />
          </div>
        )}
      </section>
    </main>
  );
}
