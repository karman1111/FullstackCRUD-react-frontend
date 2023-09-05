import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const [positions, setPositions] = useState([]); // To store the positions fetched from the API

  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    position: "",
  });
  const { position, username, email } = user;

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/positions")
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      });
  }, []);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!position) {
      alert('Please select a position.');
      return;
    }

    if(!username){
       alert('Please write a username.');
      return;
    }

    if(!email){
        alert('Please a email.');
        return;
     }
  
    const userDto = {
      username,
      email,
      positionId: parseInt(position), // Ensure it's an integer
    };
  
    console.log(userDto);
    await axios.post("http://localhost:8080/api/v1/users", userDto);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Position" className="form-label">
                Position
              </label>
              <select
                className="form-select"
                name="position"
                value={position}
                onChange={(e) => onInputChange(e)}
                >
                <option value="">Select a Position</option>
                {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                    {position.position}
                    </option>
                ))}
                </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
