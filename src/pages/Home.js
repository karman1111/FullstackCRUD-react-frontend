import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = (page) => {
        axios.get(`http://localhost:8080/api/v1/users?page=${page}&pageSize=10`)
            .then((response) => {
                console.log('User loaded successfully');
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8080/api/v1/users/${userId}`)
            .then(() => {
                console.log('User deleted successfully');
                loadUsers(currentPage);
            })
            .catch((error) => {
                console.error("Error deleting the user");
            });
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container">
            <h1>User List</h1>
            {users && users.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.positionId}</td>
                                <td>{user.date}</td>
                                <td>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
                                    <Link className="btn btn-success mx-2" to={`/edit/${user.id}`}>Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No users found.</p>
            )}
            <div className="pagination">
                {currentPage > 1 && (
                    <button className="btn btn-primary" onClick={prevPage}>Previous</button>
                )}
                <span className="mx-2">Page {currentPage}</span>
                {currentPage < totalPages && (
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                )}
            </div>
        </div>
    );
}

export default Home;
