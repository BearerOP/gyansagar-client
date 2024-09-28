import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { motion } from 'framer-motion'
import { Grid2X2, List, Home, User, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CommandMenu from "@/components/command-menu"
import { useLocation } from "react-router-dom"
import { Search } from "lucide-react"

export default function DashboardLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]);
  const [open, setOpen] = useState(false)

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Courses", href: "/courses/all", icon: Grid2X2 },
    { name: "Purchased Courses", href: "/courses/purchased", icon: List },
    { name: "My Courses", href: "/courses/my", icon: Grid2X2 },
    { name: "Published Courses", href: "/courses/published", icon: List },
    { name: "Draft Courses", href: "/courses/draft", icon: Grid2X2 },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

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
            <CommandMenu open={open} setOpen={setOpen} items={navigationItems} />
          </div>
        </div>
      </motion.div>

      <Separator className="my-4" />

      <nav className="flex space-x-4 mb-4">
        {navigationItems.slice(1, 6).map((item) => (
          <Link 
            key={item.name} 
            to={item.href}
            className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Outlet />
    </div>
  )
}