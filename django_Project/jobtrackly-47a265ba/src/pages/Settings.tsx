
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="app-container py-12">
      <Card className="max-w-xl mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Settings coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
