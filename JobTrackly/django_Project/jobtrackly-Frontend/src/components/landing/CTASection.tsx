
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


export function CTASection() {
    const { user } = useAuth();
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="app-container text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to organize your job search?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of job seekers who are finding success with JobTrackly
        </p>
        {!user && (
          <Button size="lg" asChild>
            <Link to="/register">Get Started — It's Free</Link>
          </Button>
         )}
      </div>
    </section>
  );
}
