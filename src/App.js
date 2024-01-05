import React, { useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/url", {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const displayShortenedUrl = () => {
    const fullShortUrl = `http://localhost:5000/${shortUrl}`;

    return (
      <div className="sm:flex block justify-center items-center p-12 gap-3 text-center">
        <p className=" font-bold font-sans text-center p-1">Shortened Url:</p>
        <a href={fullShortUrl} target="_blank" rel="noopener noreferrer">
          {fullShortUrl}
        </a>
      </div>
    );
  };

  return (
    <div>
      <h1 className="font-bold text-center bg-[#676766] text-white font-sans  ">
        URL Shortener
      </h1>

      <div className="flex flex-col justify-center items-center py-12 m-2 ">
        <form
          onSubmit={handleSubmit}
          className="text-center sm:flex block justify-center gap-3 w-full sm:w-auto"
        >
          <div className="flex justify-center items-center">
            <label
              htmlFor="originalUrl"
              className="font-semibold font-sans text-black/80 text-center"
            >
              Original URL:
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="border border-black p-3 lg:w-[800px] md:w-[500px] sm:w-[300px] w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-black/90 hover:bg-gray-500 font-sans font-semibold capitalize text-white p-[13px] w-full sm:w-auto sm:mt-0 mt-4  "
          >
            Shorten Url
          </button>
        </form>
      </div>

      {shortUrl && displayShortenedUrl()}
    </div>
  );
}

export default App;
