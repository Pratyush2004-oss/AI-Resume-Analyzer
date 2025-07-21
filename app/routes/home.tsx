import { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { resumes } from "../../constants/index";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
   if(!auth.isAuthenticated) navigate("/auth?next=/");
  },[auth.isAuthenticated])
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedbacks</h2>
        </div>
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume: Resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>

    </main>
  );
}
