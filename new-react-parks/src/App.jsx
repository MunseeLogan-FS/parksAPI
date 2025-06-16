import { useState } from "react";
import "./App.css";

function App() {
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : process.env.REACT_APP_BASE_URL;

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to the National Parks App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default App;
