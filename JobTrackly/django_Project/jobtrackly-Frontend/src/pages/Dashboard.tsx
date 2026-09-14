import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Job, JobStatus } from "@/types/job";
import { JobList } from "@/components/JobList";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobForm } from "@/components/JobForm";
import { JobDetailDialog } from "@/components/JobDetailDialog";
import { JobFilters } from "@/components/JobFilters";
import { DashboardStats } from "@/components/DashboardStats";
import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardAnalytics } from "@/components/DashboardAnalytics";
import axios from "axios";
import { getCSRFToken } from './Auth/axiosConfig';

type JobWithDateObject = Omit<Job, 'dateApplied'> & { dateApplied: Date };



export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false);
  const [isEditJobDialogOpen, setIsEditJobDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobForForm, setSelectedJobForForm] = useState<Partial<JobWithDateObject> | undefined>(undefined);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | JobStatus>("all");

  // useEffect(() => {
  //   setJobs(mockJobs);
  //   setFilteredJobs(mockJobs);
  // }, []);


  const [refreshJobs, setRefreshJobs] = useState(false);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
          const csrfToken = await getCSRFToken(); // 👈 Fetch CSRF token
          
        const response = await axios.get("user/getjobdetails/",
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken, // Add CSRF token to headers
            },
            withCredentials: true, // Important for sending cookies (sessions)
          }
        );
        console.log(response.data)
        // const fetchedJobs: Job[] = response.data.applications;
        const mappedJobs: Job[] = response.data.applications.map((app: any) => ({
          id: app.id.toString(),
          company: app.company,
          position: app.position,
          location: app.location,
          jobType: app.jobtype || "Full-time", // if API sends job_type
          salary: app.salary?.toString() ?? "",
          link: app.job_url ?? "",
          description: app.description ?? "",
          status: app.status,
          dateApplied: app.dateApplied, // If UI expects Date object, wrap with new Date()
          dateModified: app.updated_at || null, // If available
          contactName: app.contactName ?? "",
          contactEmail: app.contactEmail ?? "",
          notes: app.notes ?? "",
          job_id :app.job_id, 
          contactPhone : app.contactPhone,
        }));
        // console.log("------------",mappedJobs)
        setJobs(mappedJobs);
        setFilteredJobs(mappedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
  
    fetchJobs();
  }, [refreshJobs]);

  const handleJobDeleted = (jobId: string) => {
  // Optionally, you could also update jobs locally here to remove the deleted job immediately
  setJobs((prev) => prev.filter(job => job.job_id !== jobId));
  setFilteredJobs((prev) => prev.filter(job => job.job_id !== jobId));

  // Trigger a full refresh from backend if you want (optional)
  setRefreshJobs((prev) => !prev);
};

  const handleAddJob = async(data: any) => {
    const newJob: Job = {
      ...data,
      id: uuidv4(),
      dateApplied: data.dateApplied instanceof Date ? data.dateApplied.toISOString() : data.dateApplied,
      dateModified: new Date().toISOString(),
    };

    setJobs((prevJobs) => [...prevJobs, newJob]);
    setFilteredJobs((prevJobs) => [...prevJobs, newJob]);

    setRefreshJobs((prev) => !prev);

    setIsNewJobDialogOpen(false);
  };

  const handleEditJob = (data: any) => {
    if (!selectedJob) return;

    const updatedJob: Job = {
      ...selectedJob, 
      ...data,
      dateApplied: data.dateApplied instanceof Date ? data.dateApplied.toISOString() : data.dateApplied,
      dateModified: new Date().toISOString(),
    };

    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setFilteredJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    
    setIsEditJobDialogOpen(false);
    setSelectedJob(updatedJob);
    setIsDetailDialogOpen(true);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsDetailDialogOpen(true);
  };

  const handleEditJobClick = (job: Job) => {
    setSelectedJob(job);
    
    const jobForForm: Partial<JobWithDateObject> = {
      ...job,
      dateApplied: new Date(job.dateApplied)
    };
    setSelectedJobForForm(jobForForm);
    
    setIsDetailDialogOpen(false);
    setIsEditJobDialogOpen(true);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...jobs];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm) ||
          job.position.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((job) => job.status === filters.status);
    }

    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];

      if (filters.sortBy === "dateApplied" || filters.sortBy === "dateModified") {
        return filters.sortOrder === "asc"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }

      if (filters.sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredJobs(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | JobStatus);
    
    if (value === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.status === value));
    }
  };

  return (
    <div className="app-container py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-background/20 dark:via-background dark:to-background/30 min-h-[100vh] rounded-xl shadow-inner dark:shadow-none">
      <div className="page-header">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent tracking-tight font-sans drop-shadow dark:from-blue-400 dark:via-primary dark:to-purple-400">
            Job Applications
          </h1>
          {/* <Button
            onClick={() => setIsNewJobDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-primary hover:from-primary hover:to-purple-500 text-white shadow dark:shadow-primary/20"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Job
          </Button> */}
        </div>
        <DashboardStats jobs={jobs} />
      </div>
      {/* <div className="mb-8">
        <JobFilters onFilterChange={handleFilterChange} />
      </div> */}
      <div className="mb-8">
        <DashboardAnalytics jobs={jobs} />
      </div>
      <div className="mb-8">
        <JobFilters onFilterChange={handleFilterChange} />
      </div>
     <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="offer">Offer</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-start sm:justify-end">
          <Button
            onClick={() => setIsNewJobDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-primary hover:from-primary hover:to-purple-500 text-white shadow dark:shadow-primary/20"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>
      </div>
        <TabsContent value={activeTab}>
          <JobList jobs={filteredJobs} onViewJob={handleViewJob}  onDeleteJob={handleJobDeleted} />
        </TabsContent>
      </Tabs>

      <Dialog open={isNewJobDialogOpen} onOpenChange={setIsNewJobDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Job Application</DialogTitle>
          </DialogHeader>
          <JobForm onSubmit={handleAddJob} />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditJobDialogOpen} onOpenChange={setIsEditJobDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
          </DialogHeader>
          <JobForm
            onSubmit={handleEditJob}
            defaultValues={selectedJobForForm}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
      <JobDetailDialog
        job={selectedJob}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onEdit={handleEditJobClick}
      />
    </div>
  );
}
