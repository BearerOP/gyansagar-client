import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/CourseSeller';
import NotFound from './components/not-found';
import Login from './pages/LogIn';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route element={<RootLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
