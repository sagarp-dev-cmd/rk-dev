import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Job } from "@/types/job";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { getCSRFToken } from '../pages/Auth/axiosConfig'; // Import your getCSRFToken function

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onDelete: (jobId: string) => void;  // Add this
 
}

// delete job
const handleDeleteJob = async (job_id: string) => {
  try {
    const csrfToken = await getCSRFToken();

    const response = await axios.delete("user/deletejobdetails/", {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      data: { job_id }, // Important: axios needs data in 'data' key for DELETE
      withCredentials: true,
    });

    // console.log("Job deleted:", response.data.message);
    // window.location.reload(); 
  } catch (error) {
    console.error("Failed to delete job:", error);
  }
};


export function JobCard({ job, onView,onDelete }: JobCardProps) {
   const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;  // if user clicks Cancel, stop here
    // console.log("Job ID to delete:", job.job_id,job); 
    await handleDeleteJob(job.job_id);
    onDelete(job.id);  // Notify parent to remove job from UI       
  };

  return (
    <Card className="card-hover animate-fade-in relative">
      {/* Delete Button in Top Right */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-0 right-0 text-red-500 hover:text-red-800 bg-transparent hover:bg-transparent"
         onClick={handleDelete} // 👈 Call the delete handler
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{job.position}</h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <StatusBadge status={job.status} />
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Application Date: {new Date(job.dateApplied).toLocaleDateString('en-GB')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Modified {formatDistanceToNow(new Date(job.dateModified), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onView(job)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
