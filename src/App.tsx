import { useState } from "react";

import UpdateElectron from "@/components/update";
import logoVite from "./assets/logo-vite.svg";
import logoElectron from "./assets/logo-electron.svg";
import "./App.css";
import Layout from "./layout/index";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div
      className="App"
      style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}
    >
      <Layout />
    </div>
  );
}

export default App;
