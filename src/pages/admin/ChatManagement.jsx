import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleDashBoardData } from "../../constants/sampleData";
import axios from "axios";
import { server } from "../../constants/config";

const columns = [
  { Header: "ID", accessor: "id", width: 100 },
  { Header: "Avatar", accessor: "avatar", width: 120 },
  { Header: "Name", accessor: "name", width: 250 },
  { Header: "Total Members", accessor: "totalMembers", width: 150 },
  { Header: "Members", accessor: "members", width: 100 },
  { Header: "Total Messages", accessor: "totalMessages", width: 100 },
  { Header: "Created By", accessor: "creator", width: 150 },
];

const transformImage = (urls, width) => {
  if (Array.isArray(urls)) {
    return (
      <div className="relative" style={{ width: width, height: width }}>
        {urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${index}`}
            width={width}
            className="absolute rounded-[50%] aspect-square object-cover border border-black"
            style={{
              top: 0,
              left: index * 15 + "px",
              zIndex: urls.length - index,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    );
  } else {
    return (
      <img
        src={urls}
        alt="Avatar"
        width={width}
        className="rounded-[50%] aspect-square object-cover border border-black"
      />
    );
  }
};

const transformObjectImage = (urls, width) => {
  if (Array.isArray(urls)) {
    return (
      <div className="relative" style={{ width: width, height: width }}>
        {urls.map((url, index) => (
          <img
            key={index}
            src={url.avatar}
            alt={`User ${index}`}
            width={width}
            className="absolute rounded-[50%] aspect-square object-cover border border-black"
            style={{
              top: 0,
              left: index * 15 + "px",
              zIndex: urls.length + index,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    );
  }
};

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const fetchData = (chats) => {
    setRows(
      chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50), 
        members: transformObjectImage(i.members, 50),
        creator: (
          <div className="flex items-center">
            {transformImage([i.creator.avatar], 40)} {/* Small avatar */}
            <span className="ml-2">{i.creator.name}</span> {/* Name */}
          </div>
        ),
      }))
    );
  };

  const getAllChats = async ()=>{
    const res = await axios.get(`${server}/api/v1/admin/chats`, {withCredentials: true,});
    fetchData(res?.data?.chats);
  }

  useEffect(() => {
    getAllChats();
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

export default ChatManagement;
