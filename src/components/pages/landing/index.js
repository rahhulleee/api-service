// src/components/landing/index.js
import React, { useEffect, useState } from "react";
import { List, Spin } from "antd";
import "./index.css";

const Landing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users"); // Assume this is your API endpoint
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="landing-container">
      <h2>Users List</h2>
      <List
        itemLayout="vertical"
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user.id}>
            <List.Item.Meta
              title={`ID: ${user.id}`}
              description={`Email: ${user.email}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Landing;
