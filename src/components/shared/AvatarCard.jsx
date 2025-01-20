import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {

  return (
    <div className="flex items-center">
      <div className="w-[5rem] h-[3rem]">
        {avatar?.map((url, index) => (
          <img
            key={Math.random() * 100}
            src={url}
            alt={index}
            className="w-[3rem] h-[3rem] rounded-[20%] object-cover"
            style={{
              position: "absolute",
              left: `${index + 1}rem`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarCard;
