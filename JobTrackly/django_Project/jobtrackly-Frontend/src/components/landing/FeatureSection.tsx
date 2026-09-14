
export function FeatureSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to manage your job search</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            JobTrackly keeps all your job applications organized in one place so you can focus on what matters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8v13H3V8"/><path d="M21 6V3h-5.5a2 2 0 0 0-2 2v1"/><circle cx="12" cy="13" r="2"/><path d="M12 15v5"/></svg>}
            title="Application Tracking"
            description="Keep track of every job you apply to with status updates and important details in one organized dashboard"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="8" height="8" x="8" y="8" rx="1"/><path d="M4 8v1"/><path d="M4 12v1"/><path d="M4 16v1"/><path d="M8 4h1"/><path d="M12 4h1"/><path d="M16 4h1"/><path d="M20 8v1"/><path d="M20 12v1"/><path d="M20 16v1"/><path d="M8 20h1"/><path d="M12 20h1"/><path d="M16 20h1"/></svg>}
            title="Visual Analytics Dashboard"
            description="Spot trends, monitor applications, and make smarter moves with beautifully visualized progress"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>}
            title="Follow-up Reminders"
            description="Never forget to follow up on your applications with smart reminders for important dates and deadlines"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
