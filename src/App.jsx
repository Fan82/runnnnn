import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Running from "./pages/Running";
import Friends from "./pages/Friends";
import SearchPage from "./pages/SearchPage";
import CreatPost from "./pages/CreatPost";
import Setting from "./pages/Setting";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
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
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/creatpost" element={<CreatPost />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/running" element={<Running />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
