import React from "react";

const Loaders = () => {
  return (
    <>
      <div className="w-[100vw] overflow-x-hidden h-[calc(100vh)] md:mt-3 max-lg:h-[calc(100vh)] grid md:gap-x-2 lg:grid-cols-[30%_40%_30%] md:grid-cols-[40%_60%] sm:grid-cols-1">
        <div className="w-fill bg-slate-200 rounded-r-lg max-sm:hidden"></div>

        <div className="w-fill flex flex-col gap-y-[12px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-slate-200 h-20 rounded-lg shadow-md shadow-slate-400"></div>
          ))}
        </div>
        <div className="w-fill bg-slate-200 rounded-l-lg max-lg:hidden"></div>
      </div>
    </>
  );
};

export default Loaders;
