import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../App.css";

function Park() {
  const [parks, setParks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    location: "",
    area: "",
    established: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3001/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getPark();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getPark = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/nationalParks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setParks(data.data);
          setValues({
            name: data.data.name,
            location: data.data.location,
            area: data.data.area,
            established: data.data.established,
          });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deletePark = async () => {
    try {
      await fetch(`${API_BASE}/nationalParks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setParks(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updatePark = async () => {
    try {
      await fetch(`${API_BASE}/nationalParks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePark();
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
        {loading ? <h1>Loading...</h1> : error ? <h1>Error: {error}</h1> : null}
        <h1>Park Profile</h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.location}</p>
        <p>{values && values.area}</p>
        <p>{values && values.established}</p>

        <button onClick={() => deletePark()}>Delete Park</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Area:
            <input
              type="text"
              name="area"
              value={values.area}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Established:
            <input
              type="text"
              name="established"
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

export default Park;
