
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";  
import axios from "axios"; // Import Axios


export default function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("user/register/", {
        username,
        email,
        password,
        password2: password, // Using the same password for both fields
      });
  
      // console.log("Registration successful:", response.data);
  
      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please check the inputs.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
         JobTrackly
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{" "}
                <Link 
                  to="/terms" 
                  className="font-medium text-primary hover:underline"
                >
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
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
              <Button variant="outline" className="w-full">
                <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}