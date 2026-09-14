
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { StatusBadge } from "./StatusBadge";
import { Calendar, ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface JobDetailDialogProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (job: Job) => void;
}

export function JobDetailDialog({ job, isOpen, onClose, onEdit }: JobDetailDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{job.position}</span>
            <StatusBadge status={job.status} />
          </DialogTitle>
          <DialogDescription className="text-base font-medium">
            {job.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Applied {new Date(job.dateApplied).toLocaleDateString()}</span>
            </div>
            {job.jobType && (
              <div>
                <span className="font-medium">Job Type:</span> {job.jobType}
              </div>
            )}
            {job.salary && (
              <div>
                <span className="font-medium">Salary:</span> {job.salary}
              </div>
            )}
          </div>

          {job.link && (
            <div>
              <a 
                href={job.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View Job Posting
              </a>
            </div>
          )}

          {job.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Job Description</h3>
              <p className="text-sm whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          {(job.contactName || job.contactEmail || job.contactPhone) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-2">
                  {job.contactName && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{job.contactName}</span>
                    </div>
                  )}
                  {job.contactEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${job.contactEmail}`} className="text-primary hover:underline">
                        {job.contactEmail}
                      </a>
                    </div>
                  )}
                  {job.contactPhone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${job.contactPhone}`} className="text-primary hover:underline">
                        {job.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {job.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm whitespace-pre-wrap">{job.notes}</p>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(job)}>
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
