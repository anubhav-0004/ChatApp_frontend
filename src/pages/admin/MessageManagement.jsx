import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";



const columns = [
  { Header: "ID", accessor: "id", width: 100 },
  { Header: "Attachments", accessor: "attachment", width: 120 },
  { Header: "Content", accessor: "content", width: 150 },
  { Header: "Sender", accessor: "Sent By", width: 150 },
  { Header: "Chat", accessor: "chat", width: 150 },
  { Header: "GroupChat", accessor: "group chat", width: 100 },
  { Header: "Created At", accessor: "time", width: 150 },
];

const MessageManagement = () => {
  return (
    <AdminLayout>
      <div>MessageManagement</div>
    </AdminLayout>
  );
};

export default MessageManagement;
