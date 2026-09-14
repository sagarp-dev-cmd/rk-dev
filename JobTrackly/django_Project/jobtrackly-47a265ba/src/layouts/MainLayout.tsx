
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-background dark:via-background dark:to-background dark:bg-none">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="app-container text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} JobTrackly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
