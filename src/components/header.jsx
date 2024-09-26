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
  const [scrolled, setScrolled] = useState(false)

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
        setFetchingUserDetails(true)
        const fetchedUser = await fetchUserDetails()
        if (fetchedUser) {
          setUser(fetchedUser)
        }
        setFetchingUserDetails(false)
      } else {
        setFetchingUserDetails(false)
      }
    }

    getUserDetails()
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [user, setUser, scrolled])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-white/30 transition-all duration-300 ease-in-out ${
      scrolled
        ? 'bg-background/50 backdrop-blur-md h-14 rounded-lg my-4 mx-40 border px-4'
        : 'bg-background h-20 border-b'
    }`}>
      <div className="container mx-auto px-4 h-full flex items-center">
        <Link className="flex items-center justify-center" to={'/'}>
          <MountainIcon className={`transition-all duration-300 ease-in-out ${
            scrolled ? 'h-5 w-5' : 'h-6 w-6'
          }`} />
          <span className="sr-only">Gyan Sagar</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className={`text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out ${
            scrolled ? 'text-xs' : 'text-sm'
          }`} to={'/'}>
            Features
          </Link>
          <Link className={`text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out ${
            scrolled ? 'text-xs' : 'text-sm'
          }`} to={'/'}>
            Pricing
          </Link>
          <Link className={`text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out ${
            scrolled ? 'text-xs' : 'text-sm'
          }`} to={'/'}>
            About
          </Link>
          <Link className={`text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out ${
            scrolled ? 'text-xs' : 'text-sm'
          }`} to={'/'}>
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center space-x-4">
          <ModeToggle />
          {loading || fetchingUserDetails ? (
            <Loader className="h-6 w-6" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <Avatar className={`transition-all duration-300 ease-in-out ${
                    scrolled ? 'h-7 w-7' : 'h-8 w-8'
                  }`}>
                    <AvatarImage src={user.prefs.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={"/profile"} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={'/login'}>
            <Button>
              Login
            </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}