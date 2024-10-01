import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LandingPage from '@pages/LandingPage';
import NotFound from './components/not-found';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import DashboardLayout from './layouts/DashboardLayout';
import PurchasedCourses from './components/purchased-courses';
import AllCourses from './components/all-courses';
import MyCourses from './components/my-courses';
import ViewCourse from './components/view-course';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/courses/all" element={<AllCourses />} />
            <Route path="/courses/purchased" element={<PurchasedCourses />} />
            <Route path="/courses/my" element={<MyCourses />} />
            <Route path="/courses/published" element={<PurchasedCourses />} />
            <Route path="/courses/draft" element={<PurchasedCourses />} />
            <Route path="/courses/:id" element={<ViewCourse />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;