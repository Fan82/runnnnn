import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Running from "./pages/Running";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/friends" element={<Friends />} />
        <Route path="/running" element={<Running />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
