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
import CreateCourse from './components/create-course';
import EditCourse from './components/edit-course';
import PublishedCourses from './components/published-courses';
import DraftCourses from './components/draft-courses';
import { Background } from './components/ui/background';
// import BgGradient from './components/bg-gradient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/bg' element={<Background />} />
        <Route path='/login' element={<Login />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/courses/all" element={<AllCourses />} />
            <Route path="/courses/purchased" element={<PurchasedCourses />} />
            <Route path="/courses/my" element={<MyCourses />} />
            <Route path="/courses/published" element={<PublishedCourses />} />
            <Route path="/courses/draft" element={<DraftCourses />} />
            <Route path="/courses/:id" element={<ViewCourse />} />
            <Route path="/courses/edit/:id" element={<EditCourse />} />
            <Route path="/courses/create" element={<CreateCourse/>}
            />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;