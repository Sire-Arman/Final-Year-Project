"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Vader from "@/components/Vader";
import TextBlob from "@/components/TextBlob";
import Advanced from "@/components/Advanced";

function Page() {
  const [inputText, setInputText] = useState("");
  const [vaderChecked, setVaderChecked] = useState(true);
  const [textBlobChecked, setTextBlobChecked] = useState(false);
  const [advancedChecked, setAdvancedChecked] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send inputText and selected options to backend endpoint
    const options = {
      vader: vaderChecked,
      textBlob: textBlobChecked,
      advanced: advancedChecked,
    };

    let endpoint = "http://127.0.0.1:5000/myParagraph";
    if (vaderChecked) {
      endpoint += "Vader";
    } else if (textBlobChecked) {
      endpoint += "TextBlob";
    } else if (advancedChecked) {
      endpoint += "Advanced";
    }

    axios
      .post(endpoint, { text: inputText })
      .then((response) => {
        // Handle the response from the backend
        setResponseData(response.data);
      })
      .catch((error) => {
        // Handle error if any
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "vader") {
      setVaderChecked(checked);
      setTextBlobChecked(false);
      setAdvancedChecked(false);
    } else if (name === "textBlob") {
      setTextBlobChecked(checked);
      setVaderChecked(false);
      setAdvancedChecked(false);
    } else if (name === "advanced") {
      setAdvancedChecked(checked);
      setVaderChecked(false);
      setTextBlobChecked(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center text-4xl font-bold m-8">
        Enter any text here
      </div>
      {!isLoading && Object.keys(responseData).length === 0 && (
        <div className="flex justify-center items-center m-8 image-container">
          <Image src="/paragraph.png" width={400} height={400} alt="News" />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter any text here"
          className="border border-gray-300 w-64 mx-4 py-4 px-6 rounded-[10px] w-96"
        />
        <div>
          <label className="m-2">
            <input
              type="checkbox"
              name="vader"
              checked={vaderChecked}
              onChange={handleCheckboxChange}
            />
            Vader
          </label>
          <label className="m-2">
            <input
              type="checkbox"
              name="textBlob"
              checked={textBlobChecked}
              onChange={handleCheckboxChange}
            />
            TextBlob
          </label>
        </div>
        <button
          type="submit"
          className=" mx-2 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none "
        >
          Analyze
        </button>
      </form>
      {vaderChecked && Object.keys(responseData).length > 0 && (
        <Vader data={responseData} />
      )}
      {textBlobChecked && Object.keys(responseData).length > 0 && (
        <TextBlob data={responseData} />
      )}
    </div>
  );
}

export default Page;
