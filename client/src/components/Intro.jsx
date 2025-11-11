import axios from "axios";
import Button from "./Button";
import { useEffect, useState } from "react";

function Intro() {
  const [introData, setIntroData] = useState({});
  const [resumeURL, setResumeURL] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const introRes = await axios.get(`${API_URL}/get-intro`);
        setIntroData(introRes.data.data);

        const aboutRes = await axios.get(`${API_URL}/get-about`);
        setResumeURL(aboutRes.data.data?.resume || "");
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [API_URL]);

  const handleDownload = async () => {
    if (!resumeURL) return;

    try {
      const response = await fetch(resumeURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = "Aakash_Shrestha_CV.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  return (
    <div className="h-[90vh] bg-primary flex flex-col items-start justify-center gap-8 p-6 sm:h-full">
      <h1 className="text-white text-xl font-bold">{introData.welcomeText}</h1>
      <h1 className="text-secondary text-7xl sm:text-3xl font-semibold">
        {introData.firstName} {introData.lastName}
      </h1>
      <h1 className="text-white text-5xl sm:text-3xl font-semibold">
        {introData.caption}
      </h1>

      <p className="text-white w-2/3 text-justify leading-6">
        {introData.description}
      </p>

      {resumeURL && (
        <div className="m-2">
          <Button text="Download Resume" onClick={handleDownload} />
        </div>
      )}
    </div>
  );
}

export default Intro;
