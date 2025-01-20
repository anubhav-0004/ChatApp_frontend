import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

const DashBoard = () => {
  return (
    <AdminLayout>
      <div>
        <div
          className="w-full flex mx-auto justify-between md:justify-center md:font-medium 
        max-md:px-2 px-6 py-1 items-center text-black text-2xl bg-black bg-opacity-20"
        >
          <h1 className="md:text-3xl">Admin DashBoard</h1>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashBoard;
