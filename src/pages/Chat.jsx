import React from "react";
import AppLayout from "../components/layout/AppLayout";

const Chat = () => {
  return (
    <div
      className="text-[#dfd3ad] w-full h-full text-xl opacity-95 p-2 overflow-y-auto"
      style={{
        backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0GqVqurY1V77t3jqPKUVYKRXa_HzZ4BBkw&s")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed",
      }}
    >
      <Chatss />
      <Chatss />
      <Chatss />
      <Chatss />
      <Chatss />
      <Chatss />
      <Chatss />
    </div>
  );
};

const Chatss = () => (
  <div>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2  leading-6">
      1 asdfg sdfg asdfs sdfs srrfcf mkjhu dsfg sdfg gfvdcth hyrtgdftyr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      2 asdfg sdfg asdfs sdfs srrfcf mkjhu trgfde egdd d
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      3 asdfg sdfg asdfs sdfs srrfcf mkjhu ae trge rgrg k rgvsef{" "}
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      4 asdfg sdfg asdfs sdfs srrfcf mkjhu helloo hello helloooo helloooo
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      5 asdfg sdfg asdfs sdfs srrfcf mkjhu df df hgtfd
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      6 asdfg sdfg asdfs sdfs srrfcf mkjhu ert uy dftr wrtf sr5trwrt 455 edred
      dsrtrgfd
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      1 asdfg sdfg asdfs sdfs srrfcf mkjhu ert rtfe y dgyt yhdfhr rw 23 edr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      2 asdfg sdfg asdfs sdfs srrfcf mkjhu werty etyhrte tuyrtdgtyr trtry teyr
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      3 asdfg sdfg asdfs sdfs srrfcf mkjhu rtytwretgtjtk ghh hyeg hyrge r
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      4 asdfg sdfg asdfs sdfs srrfcf mkjhudergf frte srtes e453r756r6 dt5
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      5 asdfg sdfg asdfs sdfs srrfcf mkjhus s sqre sfertwef tew
    </p>
    <p className="m-1 bg-[#2a2a2f] max-w-[75%] w-fit rounded-md text-[#bc9898] py-1 px-2 leading-6">
      6 asdfg sdfg asdfs sdfs srrfcf mkjhu wert der 962 fggb 54tb tt
    </p>
  </div>
);

export default AppLayout(Chat);
