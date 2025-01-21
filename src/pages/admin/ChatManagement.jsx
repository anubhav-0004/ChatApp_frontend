import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleDashBoardData } from "../../constants/sampleData";

const columns = [
  { Header: "ID", accessor: "id", width: 100 },
  { Header: "Avatar", accessor: "avatar", width: 120 },
  { Header: "Name", accessor: "name", width: 250 },
  { Header: "Total Members", accessor: "totalMember", width: 150 },
  { Header: "Email", accessor: "email", width: 150 },
  { Header: "Members", accessor: "members", width: 100 },
  { Header: "Total Messages", accessor: "totalMessages", width: 100 },
  { Header: "Created By", accessor: "createdBy", width: 150 },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setRows(
        sampleDashBoardData.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <Table
        heading={"All Chats"}
        columns={columns}
        rows={rows}
        rowsPerPage={5}
      />
    </AdminLayout>
  );
};


const transformImage = (url, width) => {
  return <img src={url} alt="User Avatar" width={width} className="rounded-[50%] aspect-square object-cover border border-black" />;
};

export default ChatManagement;
