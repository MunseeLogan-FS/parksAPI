import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import ParksService from "../services/parks.service";

import "../App.css";

function Dashboard() {
  const [parks, setParks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    location: "",
    area: "",
    established: "",
  });
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  // console.log("API_BASE is", API_BASE);

  let ignore = false;
  useEffect(() => {
    ParksService.getAllPrivateParks().then(
      (response) => {
        console.log(response);
        if (!ignore) {
          setParks(response.data.data);
        }
      },
      (error) => {
        console.log("Secured page error", error.response);
        AuthService.logout();
        navigate("/signin");
      }
    );
    // if (!ignore) {
    //   getParks();
    // }

    // return () => {
    //   ignore = true;
    // };
  }, []);

  const getParks = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/nationalParks`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setParks(data.data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createPark = async () => {
    console.log(JSON.stringify({ parks: values }));
    try {
      await fetch(`${API_BASE}/nationalParks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ park: values }),
      }).then(() => getParks());
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPark();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>National Parks:</h1>
        <Link to="/">Home</Link>
        <ul>
          {loading ? (
            <li>Loading...</li>
          ) : parks && parks.length > 0 ? (
            parks.map((park) => (
              <li key={park._id}>
                <Link to={`/parks/${park._id}`}>{park.name}</Link>
              </li>
            ))
          ) : (
            <li>{error ? error : "No parks found"}</li>
          )}
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="e.g. Yellowstone"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              placeholder="e.g. Wyoming, Montana, Idaho"
              value={values.location}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Area:
            <input
              type="number"
              name="area"
              placeholder="e.g. 2219790"
              value={values.area}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Established:
            <input
              type="text"
              name="established"
              placeholder="e.g. 1978-09-15"
              value={values.established}
              onChange={handleInputChanges}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
