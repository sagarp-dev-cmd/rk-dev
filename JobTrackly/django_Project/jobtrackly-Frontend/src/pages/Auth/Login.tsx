
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { User, Github } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

import { getCSRFToken } from './axiosConfig';
import axios from "axios";


export default function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("login Data:", { email, password });

  try {
    const csrfToken = await getCSRFToken(); // 👈 Fetch CSRF token
    // console.log("CSRF Token Sent: ", csrfToken);

    // Use Axios for the login POST request
    const response = await axios.post(
      "user/login/", // Backend URL
      { email, password }, // Request payload
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Add CSRF token to headers
        },
        withCredentials: true, // Important for sending cookies (sessions)
      }
    );

    const data = response.data;

    // Check if login is successful
    if (response.status !== 200) {
      throw new Error(data.error || "Login failed");
    }

    // console.log("Login successful:", data);
    login(data.user.username); // Assuming your context expects an email
    navigate("/dashboard");

  } catch (error: any) {
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-background/20 dark:via-background dark:to-background/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-black text-center bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent tracking-tight font-sans drop-shadow dark:from-blue-400 dark:via-primary dark:to-purple-400">
          JobTrackly
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-xl shadow-xl glass p-1">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="ml-2">
                Remember me
              </Label>
            </div>
            <div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-primary hover:from-primary hover:to-purple-500 text-white shadow dark:shadow-primary/20"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
