import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleDashBoardData } from "../../constants/sampleData";
import moment from "moment"
import axios from "axios";
import { server } from "../../constants/config";

const columns = [
  { Header: "ID", accessor: "id", width: 100 },
  { Header: "Sender", accessor: "sender", width: 150 },
  { Header: "Chat", accessor: "chat", width: 150 },
  { Header: "GroupChat", accessor: "groupChat", width: 100 },
  { Header: "Content", accessor: "content", width: 150 },
  { Header: "Created At", accessor: "createdAt", width: 150 },
];

const transformImage = (url, width) => {
  return <img src={url} alt="User Avatar" width={width} className="rounded-[50%] aspect-square object-cover border border-black" />;
};

const MessageManagement = () => {
  const [rows, setRows] = useState([]);


  const setMessages = (messages)=> {
    setRows(messages.map((i)=>({
      ...i,
      id: i._id,
      groupChat: i?.groupChat,
      sender: (
            <div className="flex items-center">
              {transformImage([i.sender.avatar], 40)} {/* Small avatar */}
              <span className="ml-2">{i.sender.name}</span> {/* Name */}
            </div>
          ),
      createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
    })));
  }

  const getAllMessages = async ()=>{
    try {
      const res = await axios.get(`${server}/api/v1/admin/messages`,{withCredentials: true,})
      setMessages(res?.data?.transformedMessages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMessages();
  }, []);



  return (
    <AdminLayout>
      <Table heading={"All Messages"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default MessageManagement;
