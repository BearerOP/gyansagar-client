"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Path from "@/services/path";

export default function Profile() {
  const { user, logout } = useAuth(); 
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false); // State for logout loading
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await Path.get('/api/v1/user/profile');
        setUserData(response.data);
        
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true); // Start logout loading
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false); // End logout loading
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p aria-live="polite" className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>User not found.</p>
      </div>
    );
  }

  const { avatar, username, email, role, provider, providerId, myCourses, purchasedCourses } = userData;
  console.log(userData);

  return (
    <div className="min-h-screen w-full bg-black text-white p-8">
      <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleLogout} disabled={logoutLoading}>
              {logoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-gray-400">{email}</p>
              <Badge variant={role === 'admin' ? "destructive" : "secondary"} className="mt-1">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Account Details</h3>
              <p><span className="text-gray-400">Provider:</span> {provider}</p>
              <p><span className="text-gray-400">Provider ID:</span> {providerId}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Course Information</h3>
              <p><span className="text-gray-400">My Courses:</span> {myCourses.length}</p>
              <p><span className="text-gray-400">Purchased Courses:</span> {purchasedCourses.length}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">My Courses</h3>
            {myCourses.length > 0 ? (
              <ul className="list-disc list-inside">
                {myCourses.map((course) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No courses created yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Purchased Courses</h3>
            {purchasedCourses.length > 0 ? (
              <ul className="list-disc list-inside">
                {purchasedCourses.map((course) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No courses purchased yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
