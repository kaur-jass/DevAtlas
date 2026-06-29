import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Tracks from "./pages/tracks/Tracks";
import TrackWorkspace from "./pages/tracks/TrackWorkspace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path = "/tracks" element = {<Tracks/>} />
      <Route path="/tracks/:trackId" element={<TrackWorkspace />} />
    </Routes>
  );
}

export default App;