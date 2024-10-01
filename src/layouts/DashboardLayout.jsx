import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid2X2, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  
  // Retrieve the user's role from session storage
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page on route change
  }, [pathname]);

  // Define navigation items, conditionally rendering for 'user' role
  const navigationItems = [
    { name: "All Courses", href: "/courses/all", icon: Grid2X2 },
    { name: "Purchased Courses", href: "/courses/purchased", icon: List },
    { name: "My Courses", href: "/courses/my", icon: Grid2X2 },
    { name: "Published Courses", href: "/courses/published", icon: List },
    { name: "Draft Courses", href: "/courses/draft", icon: Grid2X2 },
  ];

  // Filter items to show only for 'user' role
  const filteredItems = userRole === 'user' 
    ? navigationItems.filter(item => ["All Courses", "Purchased Courses"].includes(item.name)) 
    : navigationItems;

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-10">
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <h1 className="tracking-tighter text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-primary">
          Courses Dashboard
        </h1>
        <div className="flex justify-between items-center">
          <span className="text-lg xl:text-xl text-gray-600 dark:text-primary/75 font-medium">
            Manage your courses effectively
          </span>
        </div>
      </motion.div>

      <Separator className="my-4" />

      <nav className="flex space-x-4 mb-4">
        {filteredItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`text-gray-600 hover:text-primary p-2 px-4 rounded-full dark:text-gray-300 dark:hover:text-primary
            ${pathname === item.href ? 'bg-primary/30 text-primary font-bold' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
