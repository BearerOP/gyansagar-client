"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Path from "@/services/path";
import Loader from "@/components/loader";

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await Path.get('/api/v1/user/profile');
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p aria-live="polite" className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>User not found.</p>
      </div>
    );
  }

  const { avatar, username, email, role, provider, providerId, myCourses, purchasedCourses } = userData;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-primary/30 via-primary/20 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent" />
      <Card className="w-full max-w-4xl bg-background/80 dark:bg-background/30 backdrop-blur-sm shadow-xl border border-border relative z-10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground">Profile</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleLogout} disabled={logoutLoading} className="bg-destructive hover:bg-destructive/90">
              {logoutLoading ? <Loader className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {username ? username.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">{username}</h2>
              <p className="text-muted-foreground">{email}</p>
              <Badge variant={role === 'admin' ? "destructive" : "secondary"} className="mt-1">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Account Details</h3>
              <p><span className="text-muted-foreground">Provider:</span> <span className="text-foreground">{provider}</span></p>
              <p><span className="text-muted-foreground">Provider ID:</span> <span className="text-foreground">{providerId}</span></p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-primary">Course Information</h3>
              <p><span className="text-muted-foreground">My Courses:</span> <span className="text-foreground">{myCourses.length}</span></p>
              <p><span className="text-muted-foreground">Purchased Courses:</span> <span className="text-foreground">{purchasedCourses.length}</span></p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">My Courses</h3>
            {myCourses.length > 0 ? (
              <ul className="space-y-2">
                {myCourses.map((course) => (
                  <li key={course._id} className="bg-background/50 p-3 rounded-md">
                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">Category: {course.category}</p>
                    <p className="text-sm text-muted-foreground">Price: ${course.price.toFixed(2)}</p>
                    {course.status && (
                      <p className="text-sm text-muted-foreground">Status: {course.status}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No courses created yet.</p>
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-primary">Purchased Courses</h3>
            {purchasedCourses.length > 0 ? (
              <ul className="space-y-2">
                {purchasedCourses.map((course) => (
                  <li key={course._id} className="bg-background/50 p-3 rounded-md">
                    <h4 className="font-semibold text-foreground">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">Category: {course.category}</p>
                    <p className="text-sm text-muted-foreground">Price: ${course.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No courses purchased yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}