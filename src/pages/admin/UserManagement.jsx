import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import axios from "axios";
import { server } from "../../constants/config";

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

  const fetchData = (users = []) => {
    setRows(
      users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
        dateJoined: new Date(i.createdAt).toLocaleDateString("en-GB"),
      }))
    );
  };

  const getAllUsers = async ()=> {
    try {
      const data = await axios.get(`${server}/api/v1/admin/users`,{withCredentials: true})
      fetchData(data?.data?.transformedData);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
        getAllUsers();
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
