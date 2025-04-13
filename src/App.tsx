import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ManagementDashboard from "./components/ManagementDashboard";
import PublicView from "./components/PublicView";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<ManagementDashboard />} />
          <Route path="/public" element={<PublicView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
