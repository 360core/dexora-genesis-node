import React from "react";

const Title = ({
  title,
  highlightedWord = "",
  highlightedText,
  subtitle = "",
  className = "",
}) => {
  // Split the title and highlight the desired word
  const getHighlightedTitle = () => {
    if (!highlightedWord || !title.includes(highlightedWord)) return title;

    const parts = title.split(new RegExp(`(${highlightedWord})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === highlightedWord.toLowerCase() ? (
        <span key={index} className="">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (  
    <div className={`titlebox relative ${className}`} data-aos="fade-up">
      {/* <div className="css-hxcxi0">
                                    <div className="css-1ds0v03" />
                                    <div className="css-1vf8hc4" />
                                </div> */}
      <h2 className="relative z-10 text-4xl md:text-6xl  !leading-[1.1] ">
        <span className="block ">{getHighlightedTitle()}</span>
        {highlightedText}
      </h2>

      {subtitle && (
        <p className="text-lg sm:text-2xl text-blue-100 max-w-4xl mt-1 mb-2 bnr-desc relative title-desc leading-tight ">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
