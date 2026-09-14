
import { Job } from "@/types/job";
import { JobCard } from "./JobCard"; 

interface JobListProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
}

export function JobList({ jobs, onViewJob,onDeleteJob }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-500">No jobs found</h3>
        <p className="text-muted-foreground">Add your first job application to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onView={onViewJob}  onDelete={onDeleteJob} />
      ))}
    </div>
  );
}
