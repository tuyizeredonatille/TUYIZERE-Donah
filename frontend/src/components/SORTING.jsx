import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function REPORT() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sort = params.get("sort");

        // ✅ FIXED URL (backend yawe iri ku 3000)
        let url = "http://localhost:3000/api/users";

        if (sort) {
          url += `?sort=${sort}`;
        }

        const res = await axios.get(url);
        setData(res.data);

      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Report</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.age}</td>
              <td>{user.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default REPORT;