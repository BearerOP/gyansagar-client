"use client"

import { useState, useEffect } from "react";
import { MountainIcon, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import fetchUserDetails from "@/services/fetchUserDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/loader"; // Import your Loader component
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, setUser, logout } = useAuth(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initialize loading state to false
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true); // New state for fetching user details

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // Call the logout function from useAuth
      // console.log("User logged out successfully");
      navigate('/'); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {      
      if (!user) {
        setFetchingUserDetails(true); // Set fetching to true before fetching
        const fetchedUser = await fetchUserDetails();
        if (fetchedUser) {
          // console.log("User details fetched:", fetchedUser);
          setUser(fetchedUser); // Update user in context
        }
        setFetchingUserDetails(false); // Set fetching to false after fetching
      } else {
        setFetchingUserDetails(false); // Set fetching to false if user already exists
      }
    };

    getUserDetails();
    
  }, [user, setUser]); // Only fetch user details if user is not available

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Gyan Sagar</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
          Contact
        </Link>
      </nav>
      <div className="ml-4 flex items-center space-x-4">
        <ModeToggle />
        {loading || fetchingUserDetails ? ( // Show loading spinner if loading or fetching user details
          <Loader className="h-6 w-6" />
        ) : user ? ( // Render user details if available
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.prefs.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user.name && <p className="font-medium">{user.name}</p>}
                  {user.email && <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => {
            navigate('/login')
          }}>
            Login
          </Button> // Fallback if no user details are available
        )}
      </div>
    </header>
  );
}
