import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // Make sure this is correctly imported
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // Button component

export function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default theme is dark

  // Set the theme based on system preference or previously saved preference
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to dark mode if no preference is saved
      setTheme("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Update theme in the document body and save preference
  useEffect(() => {
    if (mounted) {
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
      } else {
        setIsDarkMode(theme === "dark");
      }
      document.body.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isDarkMode, mounted]);

  const handleThemeChange = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleDropdownThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  if (!mounted) return null; // Prevents rendering during SSR

  return (
    <div className="flex items-center gap-2">
      <Sun className={`h-5 w-5 ${isDarkMode ? "text-foreground/50" : "text-primary"}`} />
      <Switch
        checked={isDarkMode}
        onCheckedChange={handleThemeChange}
        
      />
      <Moon className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-foreground/50"}`} />
    </div>
  );
}
