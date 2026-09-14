
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-card overflow-hidden">
      <div className="app-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl leading-[1.3] md:text-6xl md:leading-[1.3] font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
            Organize your job search and land your dream role
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Track applications, monitor progress, and never miss a follow-up with JobTrackly
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary opacity-30 blur-3xl"></div>
        <div className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-accent opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-60 w-40 h-40 rounded-full bg-secondary opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
}
