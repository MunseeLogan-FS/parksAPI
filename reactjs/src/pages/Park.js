import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ParksService from "../services/parks.service";

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
      await ParksService.getPrivatePark(id).then(
        (response) => {
          console.log(response);
          if (response.data) {
            setValues(response.data.data);
          }
        },
        (error) => {
          console.log("Secured page error", error.response);
          navigate("/signin");
        }
      );
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deletePark = async () => {
    try {
      await ParksService.deletePrivatePark(id).then(
        (response) => {
          console.log(response);
          navigate("/dashboard");
        },
        (error) => {
          console.log("Secured page error", error.response);
          navigate("/signin");
        }
      );
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updatePark = async () => {
    try {
      await ParksService.updatePrivatePark(id, values).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log("Secured page error", error.response);
          navigate("/signin");
        }
      );
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
              type="number"
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
