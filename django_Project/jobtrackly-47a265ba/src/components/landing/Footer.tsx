
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-muted py-10">
      <div className="app-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
              JobTrackly
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Organize your job search journey
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            {/* <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link> */}
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
        {/* <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-sm text-muted-foreground text-center">
          <p>© 2023 JobTrackly. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
}
