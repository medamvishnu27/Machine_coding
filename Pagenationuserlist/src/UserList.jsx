import React, { useState, useEffect } from "react";
import UserCard from "./UserCards";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "170px", color: "white", fontSize: "50px" }}> User Details</h2>

      {/* Card Container */}
      <div className="card-container">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="previous-btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {(() => {
          const pageNumbers = [];
          const maxVisiblePages = 3;
          const startPage = Math.max(1, currentPage - 1);
          const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

          for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
          }

          return (
            <>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  style={{
                    fontWeight: currentPage === number ? "bolder" : "Normal",
                    margin: "5px 5px", backgroundColor: "white"
                  }}
                >
                  {number}
                </button>
              ))}
            </>
          );
        })()}

        <button className="next-btn" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Show Current Page */}
    </div>
  );
};

export default UserList;
