"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function UploadFile() {
  const [pdfText, setPDFText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [summarizedText, setSummerizedText] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileUpload = async (event: { target: any }) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    setShowFile(file.name);
    setShowModal(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target!.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      const numPages = pdf.numPages;

      // TODO: This is currently set to setting the text as a string
      let extractedText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        extractedText += pageText;
      }

      setPDFText(extractedText);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleGoBack = () => {
    // Reload the page
    window.location.reload();
  };

  const handleSummarizeButtonPress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: pdfText,
      });
      if (response.ok) {
        setShowModal(false);
        // Handle successful response
        setShowDebrief(true);
        const { summarizedText, keyPoints } = await response.json();
        setSummerizedText(summarizedText);
        setKeyPoints(keyPoints);
        console.log("Successfully generated summary and key points");
      } else {
        // Handle error response
        console.error("Failed to generate summary and key points");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error occurred", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = async () => {
    try {
      const text = `This is the summary: ${summarizedText}. This is the key points: ${keyPoints}`;
      const response = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: text,
      });
      if (response.ok) {
        const data = await response.json();
        setAudioUrl(data.audioUrl);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="bg-[#262626]">
        <h1 className="text-4xl mt-10 text-slate-100 font-medium text-center">
          Swift Debrief
        </h1>

        {/* Dropzone */}

        {!showDebrief && (
          <div className="relative w-3/4 h-[37rem] top-1/2 bottom-1/2 translate-x-[17%] translate-y-[15%] rounded-lg border-2 border-dashed border-slate-200 bg-transparent flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <svg
                  className="w-20 h-20 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="pt-5 text-center text-4xl tracking-wider text-slate-300">
                  Click on me! <br /> or <br /> Drag and drop a file
                </p>
              </div>
              <input
                id="pdf"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const files = Array.from(event.target.files || []);
                  handleFileUpload({ target: { files } });
                }}
                className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
              ></input>
            </div>
          </div>
        )}

        {showDebrief && (
          <>
            <div className="flex w-full justify-center">
              <button
                onClick={() => (window.location.href = "/upload")}
                className=" bg-indigo-500 transition-all duration-200 ease-in-out hover:bg-indigo-800 px-8 rounded-xl py-4 text-white mt-10"
              >
                Debrief a new file
              </button>
              <div className="flex w-full justify-center">
                <button
                  onClick={handlePlayAudio}
                  className="bg-indigo-500 transition-all duration-200 ease-in-out hover:bg-indigo-800 px-8 rounded-xl py-4 text-white mt-10"
                >
                  Play Audio
                </button>
              </div>
              {audioUrl && (
                <audio
                  key={audioUrl}
                  src={audioUrl}
                  controls={true}
                  className="mt-4 mx-auto"
                ></audio>
              )}
            </div>
            <div className="flex flex-col md:flex-row mx-24 justify-center mt-10 mb-20 gap-12 h-full">
              <div className="w-1/2 pb-24 h-full bg-gradient-to-br from-transparent via-white/5 to-white/10 border-white/10 border-2 rounded-lg">
                <h1 className="text-white text-4xl font-semibold text-center mt-6">
                  Summary
                </h1>
                <p className="text-white text-lg font-medium mt-10 mx-12">
                  {summarizedText}
                </p>
              </div>
              <div className="w-1/2 h-full bg-gradient-to-bl from-transparent via-white/5 to-white/10 border-white/10 border-2 rounded-lg">
                <h1 className="text-white text-4xl font-semibold text-center mt-6">
                  Key Points
                </h1>
                <ul className="text-white text-lg font-medium mt-10 mx-12 mb-12 list-none list-inside">
                  {keyPoints
                    .split("\n")
                    .filter((point) => point.trim() !== "")
                    .map((point, index) => (
                      <li key={index} className="mb-4">
                        {point.replace(/^\*\s*-?\s*/, "")}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, translateY: -100 }}
              animate={{
                opacity: 1,
                scale: 1,
                translateY: 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-white p-8 rounded-lg z-10">
                <h2 className="text-2xl font-bold mb-4">File Uploaded</h2>
                <p className="mb-8">What would you like to do next?</p>
                <p className="mb-8">
                  You uploaded: <br></br> {showFile}
                </p>
                <div className="flex justify-center gap-x-4">
                  <button
                    onClick={handleGoBack}
                    className="text-lg hover:bg-gray-300/60 transition-all duration-200 ease-in-out font-semibold text-gray-700 px-28 py-3 rounded-lg"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleSummarizeButtonPress}
                    disabled={isLoading}
                    className="text-lg bg-indigo-500 transition-all duration-200 ease-in-out hover:bg-indigo-700 font-semibold text-white px-28 py-3 rounded-lg mr-4"
                  >
                    {isLoading ? (
                      <>
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Debriefing...
                        </div>
                      </>
                    ) : (
                      "Debrief"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
