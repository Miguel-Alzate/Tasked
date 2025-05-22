import { Routes, Route } from 'react-router-dom';
import Home from '../public/modules/home/pages/Home';
import NotFound from '../public/modules/404/pages/NotFound';
// import Register from '../public/modules/auth/pages/Register';
// import Login from '../public/modules/auth/pages/Login';
// import AboutUs from '../public/modules/about/pages/AboutUs';
// import Contact from '../public/modules/contact/pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;