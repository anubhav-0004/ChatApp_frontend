import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {

  return (
    <div className="flex items-center">
      <div className="w-[5rem] h-[3rem] relative">
        {avatar.slice(0,3)?.map((url, index) => (
          <img
            key={Math.random() * 100}
            src={url}
            alt={index}
            className="w-[3rem] h-[3rem] rounded-[30%] object-cover"
            style={{
              position: "absolute",
              left: `${index/2 + 0.1}rem`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarCard;
