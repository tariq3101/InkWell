import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from './pages/login/Login'
import Register from "./pages/register/Register";
import AboutUs from "./pages/abouts/AboutUs";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "./context/Context";
import ContactUs from "./pages/contactus/ContactUs";
import Yposts from './pages/ypost/Ypost'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login />}/>
        <Route path="/write" element={user ? <Write /> : <Register />}/>
        <Route path="/settings" element={user ? <Settings /> : <Register />}/>
        <Route path="/post/:postId" element={<Single />}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/contact" element={<ContactUs />}/>
        <Route path="/your-posts" element={<Yposts />}/>
      </Routes>
    </Router>
  );
}

export default App;