
// Adjust DashboardStats for better dark mode appearance for "Total Applications" card border and text
import { Job, JobStatus } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatsCardProps {
  title: string;
  value: number;
  description?: string;
  className?: string;
}

function StatsCard({ title, value, description, className }: StatsCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className={className + " shadow-sm bg-white/80 dark:bg-background/80"}>
      <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
        <CardTitle className="text-xs sm:text-sm font-medium dark:text-purple-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
        <div className="text-lg sm:text-2xl font-bold dark:text-primary-light">{value}</div>
        {description && <p className="text-[10px] sm:text-xs text-muted-foreground dark:text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  jobs: Job[];
}

export function DashboardStats({ jobs }: DashboardStatsProps) {
  const totalJobs = jobs.length;
  const statusCount = jobs.reduce((acc, job) => {
    const status = job.status as JobStatus;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<JobStatus, number>);
  const getPercentage = (count: number) => {
    if (totalJobs === 0) return 0;
    return Math.round((count / totalJobs) * 100);
  };
  
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
      <StatsCard 
        title="Total Applications" 
        value={totalJobs} 
        description="All job applications"
        className="border-l-4 border-purple-500 dark:border-purple-400"
      />
      <StatsCard 
        title="Applied" 
        value={statusCount.applied || 0} 
        description={`${getPercentage(statusCount.applied || 0)}% of total`}
        className="border-l-4 status-badge-applied"
      />
      <StatsCard 
        title="Interviews" 
        value={statusCount.interview || 0} 
        description={`${getPercentage(statusCount.interview || 0)}% of total`}
        className="border-l-4 status-badge-interview"
      />
      <StatsCard 
        title="Offers" 
        value={statusCount.offer || 0} 
        description={`${getPercentage(statusCount.offer || 0)}% of total`}
        className="border-l-4 status-badge-offer"
      />
    </div>
  );
}
