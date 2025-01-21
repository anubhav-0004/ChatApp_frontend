import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleDashBoardData } from "../../constants/sampleData";

const columns = [
  { Header: "ID", accessor: "id", width: 100 },
  { Header: "Avatar", accessor: "avatar", width: 120 },
  { Header: "Name", accessor: "name", width: 150 },
  { Header: "UserName", accessor: "username", width: 150 },
  { Header: "Email", accessor: "email", width: 150 },
  { Header: "Friends", accessor: "friends", width: 100 },
  { Header: "Groups", accessor: "groups", width: 100 },
  { Header: "Date Joined", accessor: "dateJoined", width: 150 },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setRows(
        sampleDashBoardData.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar[0], 50),
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <Table
        heading={"All Users"}
        columns={columns}
        rows={rows}
        rowsPerPage={7}
      />
    </AdminLayout>
  );
};


const transformImage = (url, width) => {
  return <img src={url} alt="User Avatar" width={width} className="rounded-[50%] aspect-square object-cover border border-black" />;
};

export default UserManagement;
