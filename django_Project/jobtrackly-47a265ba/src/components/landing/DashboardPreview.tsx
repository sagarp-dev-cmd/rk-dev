
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardAnalytics } from "@/components/DashboardAnalytics";
import { sampleJobs } from "@/data/sampleJobs";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardPreview() {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 sm:py-20">
      <div className="app-container">
        <div className="text-center mb-10 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Your job search, simplified</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            JobTrackly provides a clear overview of your job search journey with intuitive visualization and organization
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden border shadow-lg p-3 sm:p-6 bg-card">
          <div className="aspect-auto sm:aspect-[16/9] rounded-lg bg-background p-3 sm:p-6 dark:bg-zinc-900/70 overflow-auto">
            <div className="w-full h-full flex flex-col gap-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <h2 className="text-xl sm:text-2xl font-bold">Dashboard Overview</h2>
                <DashboardStats jobs={sampleJobs} />
                <div className="mt-2 sm:mt-4">
                  <DashboardAnalytics jobs={sampleJobs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
