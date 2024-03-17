"use client";

import React, { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function UploadFile() {
  const [pdfText, setPDFText] = useState("");
  const [summarizedText, setSummerizedText] = useState("");

  const handleFileUpload = async (event: { target: any }) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
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

      // TODO: Further, we can pass this a JSON body to an API POST request
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSummarizeButtonPress = async () => {
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: pdfText,
      });
      if (response.ok) {
        // Handle successful response
        setSummerizedText(await response.text());
        console.log("successfully");
      } else {
        // Handle error response
        console.error("failed");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error occurred", error);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <h1 className="text-2xl">Upload File</h1>
        <input
          type="file"
          id="pdf"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files || []);
            handleFileUpload({ target: { files } });
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          id="summarize"
          onClick={handleSummarizeButtonPress}
        >
          Summarize
        </button>
      </div>

      <div className="container my-5">
        <h1 className="text-2xl">Summaried Text</h1>
        <p>{summarizedText}</p>
      </div>
      
      <div className="container my-5">
        <h1 className="text-2xl">PDF Overview</h1>
        <p>{pdfText}</p>
      </div>
    </div>
  );
}
