import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import AdminLayout from "../../components/layout/AdminLayout";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";

const DashBoard = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-gradient-to-r from-[#34346e] via-[#4646a0] to-[#4b4bb9] text-white shadow-md rounded-lg px-3 py-2 md:px-6 md:py-4 max-md:space-y-2">
          <div className="flex flex-col max-md:flex-row max-md:items-center md:flex-row items-center gap-4">
            <MdAdminPanelSettings className="text-4xl border text-white bg-[#3c3c8b] p-1 rounded-full shadow-md" />
            <div className="flex flex-col max-md:flex-row md:flex-row gap-1 max-md:w-full w-96">
              <input
                type="text"
                placeholder="Search...."
                className="px-4 max-md:px-2 py-2 w-full max-md:w-[90%] rounded-md placeholder-[#271d1d] text-black bg-slate-400 border border-blue-300 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#2c53a9] border border-[#5b8af0] text-[white] hover:bg-[#223c74] px-4 max-md:px-3 py-2 rounded-md font-semibold shadow-md transition-all"
              >
                Search
              </button>
            </div>
          </div>

          <div className="text-right max-md:hidden">
            <p className="text-lg max-lg:text-xs font-semibold bg-gradient-to-r from-[#ff9c3f] via-white to-[#27f527] bg-clip-text text-transparent">
              {currentTime.format("MMMM Do YYYY, hh:mm:ss A")}
            </p>
          </div>
        </div>
        <div className="w-full h-full grid grid-cols-[60%_39%] max-md:grid-cols-1 gap-x-2">
          <div className="my-2 p-3 bg-gradient-to-r from-[#34346e] via-[#4646a0] to-[#4b4bb9]  w-full rounded-md text-slate-100">
            <h3 className="text-xl text-slate-200 mb-2 text-center underline">Last 7 Days Messages</h3>
            <LineChart value={[12, 22, 4, 52, 102, 38, 20]} />
          </div>
          <div className="my-2 relative bg-gradient-to-r from-[#34346e] via-[#4646a0] to-[#4b4bb9] w-full h-auto rounded-md p-0 text-slate-100 text-center">
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[33, 77]}
            />
            <div className="absolute text-2xl top-[52%] max-md:right-[35%] max-md:top-[60%] right-[38%] flex gap-x-3 items-center">
              <FaUserGroup />
              <span>Vs</span>
              <FaUserAlt />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 max-md:grid-cols-1 gap-8 mt-5 max-md:max-w-[95%] mx-auto">
          <Widgets tittle={"Users"} Icon={<FaUserAlt />} value={30} />
          <Widgets tittle={"Chats"} Icon={<FaUserGroup />} value={10} />
          <Widgets tittle={"Message"} Icon={<MdMessage />} value={100} />
        </div>
      </div>
    </AdminLayout>
  );
};

const Widgets = ({ tittle, value, Icon }) => (
  <div className="bg-gradient-to-r from-[#34346e] via-[#4646a0] to-[#4b4bb9] p-6 rounded-lg text-white flex flex-col items-center shadow-md hover:shadow-xl transition-shadow duration-300 max-md:border">
    <div className="text-[white] border-[0.45rem] p-6 flex justify-center items-center rounded-[50%] text-2xl font-semibold mb-4 shadow-inner">
      {value}
    </div>
    <div className="flex items-center space-x-2 text-lg font-medium">
      <span className="text-3xl">{Icon}</span>
      <h3>{tittle}</h3>
    </div>
  </div>
);

export default DashBoard;
