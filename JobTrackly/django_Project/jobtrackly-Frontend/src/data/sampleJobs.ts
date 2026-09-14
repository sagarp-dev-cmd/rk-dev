
import { Job, JobStatus } from "@/types/job";

// Sample jobs data for dashboard preview
export const sampleJobs: Job[] = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: "$120,000 - $150,000",
    status: "applied" as JobStatus,
    dateApplied: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Applied through company website",
    contactEmail: "hr@techcorp.com",
    link: "https://techcorp.com/careers"
  },
  {
    id: "2",
    company: "DataSystems",
    position: "React Developer",
    location: "Remote",
    jobType: "Full-time",
    salary: "$110,000 - $130,000",
    status: "interview" as JobStatus,
    dateApplied: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "First interview scheduled for next week",
    contactEmail: "recruiting@datasystems.com",
    link: "https://datasystems.com/jobs"
  },
  {
    id: "3",
    company: "WebSolutions",
    position: "Full Stack Engineer",
    location: "New York, NY",
    jobType: "Full-time",
    salary: "$140,000 - $160,000",
    status: "offer" as JobStatus,
    dateApplied: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
    dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Received offer, negotiating salary",
    contactEmail: "jane.smith@websolutions.com",
    link: "https://websolutions.com/careers"
  },
  {
    id: "4",
    company: "AppInnovate",
    position: "UI Developer",
    location: "Austin, TX",
    jobType: "Contract",
    salary: "$100,000 - $125,000",
    status: "rejected" as JobStatus,
    dateApplied: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
    dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Position filled internally",
    contactEmail: "hr@appinnovate.com",
    link: "https://appinnovate.com/jobs"
  },
  {
    id: "5",
    company: "CloudTech",
    position: "Frontend Engineer",
    location: "Seattle, WA",
    jobType: "Full-time",
    salary: "$130,000 - $150,000",
    status: "applied" as JobStatus,
    dateApplied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    dateModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Followed up with recruiter",
    contactEmail: "jobs@cloudtech.com",
    link: "https://cloudtech.com/careers"
  },
  {
    id: "6",
    company: "DevWorks",
    position: "Senior React Developer",
    location: "Chicago, IL",
    jobType: "Full-time",
    salary: "$140,000 - $170,000",
    status: "interview" as JobStatus,
    dateApplied: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Second interview scheduled",
    contactEmail: "careers@devworks.com",
    link: "https://devworks.com/jobs"
  }
];
