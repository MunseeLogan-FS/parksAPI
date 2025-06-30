import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Park from "./pages/Park";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Authservice from "./services/auth.service";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = Authservice.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    Authservice.logout();
    setCurrentUser(null);
  };

  return (
    <div>
      <header>
        <h1>Welcome to the Park Finder</h1>
        {currentUser ? (
          <div>
            <p>logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please log in to access more features.</p>
        )}
      </header>
      <section>
        <Routes>
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/parks/:id" exact element={<Park />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
