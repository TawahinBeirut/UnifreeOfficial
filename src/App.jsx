import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import Formation from "./pages/Formation";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Lesson from "./pages/Lesson";
import EditFormation from "./pages/EditFormation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-formation" element={<EditFormation />} />
        <Route path="/edit-formation/:id" element={<EditFormation Existing={true} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="search/:search" element={<Search />} />
        <Route path="/u/:id" element={<UserPage />} />
        <Route path="/:formationName/:lessonName" element={<Lesson />} />
        <Route path="/:id" element={<Formation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
