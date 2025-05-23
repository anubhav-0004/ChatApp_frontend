import React from "react";
import { fileFormat, tranformImage } from "../../lib/features";


const RanderAttachments = (fileName, url) => {
  const cleanUrl = (url = "") => {
    return url.replace(/^"(.+)"$/, "$1");
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // e.preventDefault();
  };

  const processedUrl = cleanUrl(url);

  switch (fileName) {
    case "image":
      return (
        <a href={processedUrl} target="_blank">
          <img
          src={tranformImage(processedUrl, 200)}
          alt="image"
          preload="none"
          className=" min-w-28 aspect-square p-2 object-cover"
          onClick={handleClick}
        />
        </a>
      );
    case "video":
      return (
        <video
          src={processedUrl}
          controls
          preload="none"
          className="aspect-video object-contain"
        />
      );
    case "audio":
      return (
        <audio
          src={processedUrl}
          controls
          preload="none"
          className="max-w-[90%] mx-auto"
        />
      );
    case "pdf":
      return (
        <a
          href={processedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 bg-[white] p-1 rounded-md bg-opacity-50"
        >
          View PDF
        </a>
      );

    default:
      return (
        <a
          href={processedUrl}
          target="_blank"
          download
          style={{ color: "black" }}
        >
          Download
        </a>
      );
  }
};

export default RanderAttachments;
