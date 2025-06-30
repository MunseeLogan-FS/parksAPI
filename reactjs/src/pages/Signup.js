import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authservice from "../services/auth.service";

import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await Authservice.signup(email, password).then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          navigate("/dashboard");
        } else {
          console.error("Error signing up:", response);
        }
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Park Finder Sign Up</h1>
        <Link to="/home">Home</Link>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </header>
    </div>
  );
}

export default Signup;
