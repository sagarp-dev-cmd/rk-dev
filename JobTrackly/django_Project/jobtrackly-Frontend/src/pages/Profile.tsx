
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";


export default function Profile() {
  // All UI, not connected to GitHub!
  const { user, logout } = useAuth();

  return (
    <div className="app-container py-12">
      <Card className="max-w-xl mx-auto p-6 border-border shadow-lg dark:shadow-primary/5 dark:backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl mt-2 font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="font-semibold text-lg">{user.username}</div>
            {/* <div className="text-muted-foreground text-sm mb-4">user@example.com</div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-md bg-muted/50 p-4 dark:bg-muted/20">
                <h3 className="text-sm font-medium mb-1">Account status</h3>
                <p className="text-xs text-muted-foreground">Active since Apr 12, 2025</p>
              </div>
              <div className="rounded-md bg-muted/50 p-4 dark:bg-muted/20">
                <h3 className="text-sm font-medium mb-1">Subscription</h3>
                <p className="text-xs text-muted-foreground">Free plan</p>
              </div>
            </div>
            <div className="border-t border-border pt-6 mt-4">
              <h3 className="text-sm font-medium mb-3">Connect accounts</h3>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Github className="h-5 w-5" />
                Connect with GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
