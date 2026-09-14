
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Features", to: "/features" },
  ];

  return (
    <header className="border-b bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="app-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent tracking-tight font-sans drop-shadow dark:from-blue-400 dark:via-primary dark:to-purple-400">
              JobTrackly
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Nav links on desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground shadow"
                    : "hover:bg-muted/70 text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ModeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-muted/50 dark:bg-muted/20">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:border-gray-800" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {/* {user.username} */}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
          <div className="app-container py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground shadow"
                      : "hover:bg-muted/70 text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}