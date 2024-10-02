"use client";

import { useState, useEffect } from "react";
import { MountainIcon, User, LogOut, Search, Home, Grid2X2, List, Settings } from "lucide-react";
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
import Logo from "./logo";
import { Badge } from "@/components/ui/badge";
import CommandMenu from "@/components/command-menu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, setUser, logout } = useAuth(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initialize loading state to false
  const [fetchingUserDetails, setFetchingUserDetails] = useState(true); // New state for fetching user details
  const [scrolled, setScrolled] = useState(false);

  // Get the user's role from session storage
  const userRole = sessionStorage.getItem("role");

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "All Courses", href: "/courses/all", icon: Grid2X2 },
    { name: "Purchased Courses", href: "/courses/purchased", icon: List },
    { name: "My Courses", href: "/courses/my", icon: Grid2X2 },
    { name: "Published Courses", href: "/courses/published", icon: List },
    { name: "Draft Courses", href: "/courses/draft", icon: Grid2X2 },
    { name: "Create Course", href: "/courses/create", icon: User },
  ];

  // Filter navigation items based on the role
  const filteredItems = navigationItems.filter(item => {
    if (item.name === "Home" || item.name === "Profile" || item.name === "Settings") {
      return true; // Visible to all
    }
    if (userRole === "user") {
      return item.name === "All Courses" || item.name === "Purchased Courses"; // Only these visible for users with 'user' role
    }
    return true; // Show all for roles other than 'user'
  });

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // Call the logout function from useAuth
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
        setFetchingUserDetails(true);
        const fetchedUser = await fetchUserDetails();
        if (fetchedUser) {
          setUser(fetchedUser);
        }
        setFetchingUserDetails(false);
      } else {
        setFetchingUserDetails(false);
      }
    };

    getUserDetails();
  }, [user, setUser]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 border-black/10 transition-all duration-300 ease-in-out border-[.1px] inset-drop-shadow-2xl min-w-fit
      ${scrolled ? 'dark:bg-primary/20 bg-primary/20 backdrop-blur-md h-[70px] rounded-xl my-4 mx-40 px-4' : 'dark:bg-primary/20 bg-primary/20 h-20'}
      linear-gradient(137deg, rgba(17, 18, 20, .75) 4.87%, rgba(12, 13, 15, .9) 75.88%);
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      border: 1px solid var(--Card-Border, hsla(0, 0%, 100%, .06));
      border-radius: var(--rounding-lg);
      box-shadow: inset 0 1px 1px 0 hsla(0, 0%, 100%, .15);
      transition: height .3s ease, transform .3s ease;
      transform: translateZ(0);
      will-change: height, transform;
    `}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link className={`flex items-center justify-center gap-x-3 transition-transform duration-300 ease-in-out ${scrolled ? 'h-5 w-5' : 'inline-block'}`} to={'/'}>
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              className='flex gap-3 bg-primary/20 hover:bg-primary/30 border-primary border-[.5px]
              text-muted-foreground' 
              variant="outline" 
              onClick={() => setOpen(true)}
            >
              <span>
                <Search className='size-4'/>
              </span>
              <span>Search anything</span>
              <Badge className='rounded-[5px] w-fit bg-primary/60'>⌘ K</Badge>
            </Button>
            <CommandMenu open={open} setOpen={setOpen} items={filteredItems} />
          </div>
        </nav>
        <div className="ml-4 flex items-center space-x-4">
          <ModeToggle />
          {loading || fetchingUserDetails ? (
            <Loader className="h-6 w-6" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <Avatar className={`transition-all duration-300 ease-in-out ${scrolled ? 'h-7 w-7' : 'h-8 w-8'}`}>
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
  );
}
