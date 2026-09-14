
export type JobStatus = 'applied' | 'interview' | 'rejected' | 'offer';

export interface Job {
  id: string;
  job_id: string;
  company: string;
  position: string;
  location: string;
  jobType: string; // Full-time, Part-time, Contract, etc.
  salary?: string;
  link?: string;
  description?: string;
  status: JobStatus;
  dateApplied: string;
  dateModified: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  resumeVersion?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}
