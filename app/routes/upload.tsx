import path from "path";
import { prepareInstructions } from "../../constants";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdfToImage";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const upload = () => {
  const [isProcessing, setisProcessing] = useState<boolean>(false);
  const [statusText, setstatusText] = useState<string>("");
  const [file, setfile] = useState<File | null>(null);
  const { fs, auth, ai, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();

  // handle File Uploads
  const handleFileSelect = (file: File | null) => {
    setfile(file);
  };

  // analyze resume
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setisProcessing(true);
      setstatusText("Uploading the file...");
      const uploadFile = await fs.upload([file]);
  
      if (!uploadFile) return setstatusText("Failed to upload file");
  
      setstatusText("Converting to Image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) return setstatusText("Failed to convert pdf to image");
  
      setstatusText("Uploading the Image...");
      const uploadImage = await fs.upload([imageFile.file]);
      if (!uploadImage) return setstatusText("Failed to upload image");
  
      setstatusText("Preparing data....");
  
      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadFile.path,
        imagePath: uploadImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setstatusText("Analyzing resume...");
  
      const feedback = await ai.feedback(
        uploadFile.path,
        prepareInstructions({
          jobTitle,
          jobDescription,
          AIResponseFormat: "JSON",
        })
      );
  
      if (!feedback) return setstatusText("Error : Failed to analyze resume");
  
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;
  
      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
  
      setstatusText("Analysis complete, redirecting...");
  
      navigate(`/resume/${uuid}`);
    } catch (error) {
      setstatusText("Error : Failed to analyze resume");
    }
    finally {
      setisProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ jobTitle, companyName, jobDescription, file });
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="resume-scan"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              {/* company name */}
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              {/* job title */}
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              {/* job description */}
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>
              {/* resume Upload */}
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              {/* button */}
              <button className="primary-button" type="submit">
                <p>Analyze Resume</p>
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
