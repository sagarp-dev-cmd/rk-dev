import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // If no saved theme, default to light mode
    if (!savedTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      // Otherwise use saved theme
      const isDark = savedTheme === "dark";
      setTheme(isDark ? "dark" : "light");
      
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
