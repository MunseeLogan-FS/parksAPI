import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authservice from "../services/auth.service";

import "../App.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await Authservice.signin(email, password).then((response) => {
        if (response.status === 200) {
          navigate("/dashboard");
        } else {
          console.error("Error signing in:", response);
        }
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Park Finder Sign In</h1>
        <Link to="/home">Home</Link>

        <form onSubmit={handleSignin}>
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
          <button type="submit">Sign In</button>
        </form>
      </header>
    </div>
  );
}

export default Signin;
