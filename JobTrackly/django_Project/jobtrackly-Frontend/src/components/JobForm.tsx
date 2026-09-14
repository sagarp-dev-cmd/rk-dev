
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobStatus } from "@/types/job";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import axios from "axios";
import { getCSRFToken } from '../pages/Auth/axiosConfig'; // Import your getCSRFToken function


const formSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Job position is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  jobType: z.string().min(1, { message: "Job type is required" }),
  salary: z.string().optional(),
  link: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  description: z.string().optional(),
  status: z.enum(["applied", "interview", "rejected", "offer"] as const),
  dateApplied: z.date(),
  contactName: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email" }).optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
  job_id: z.string().optional(), // <-- ADD THIS
});

type FormValues = z.infer<typeof formSchema>;

interface JobFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
  isEdit?: boolean;
}

export function JobForm({ onSubmit, defaultValues, isEdit = false }: JobFormProps) {
  // If defaultValues contains a dateApplied string, convert it to a Date object
  const processedDefaultValues = defaultValues ? {
    ...defaultValues,
    // Convert string date to Date object if it exists
    dateApplied: defaultValues.dateApplied ? 
      (typeof defaultValues.dateApplied === 'string' ? 
        new Date(defaultValues.dateApplied) : defaultValues.dateApplied) 
      : undefined
  } : undefined;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      jobType: "Full-time",
      salary: "",
      link: "",
      description: "",
      status: "applied" as JobStatus,
      dateApplied: new Date(),
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      notes: "",
      ...processedDefaultValues,
    },
  });
  

  const handleJobSubmit = async (data: FormValues) => {
  try {
    // console.log(isEdit ? "Edited Job Data:" : "Added Job Data:", data);

    // Get the CSRF token
    const csrfToken = await getCSRFToken(); // Fetch CSRF token from your helper function

    // Prepare the payload
    const payload = {
      ...data,
      dateApplied: data.dateApplied.toISOString(), // Ensure date is in correct format (ISO string)
    };
    
    // console.log("Payload to be sent:", payload);
    // console.log("CSRF Token:", csrfToken);

    // Make the POST request with CSRF token and cookies enabled
    const response = await axios.post(
      "user/addeditjobdetails/", // Your backend endpoint
      payload,
      {
        headers: {
          "Content-Type": "application/json", // Sending JSON data
          "X-CSRFToken": csrfToken, // Add CSRF token to headers
        },
        withCredentials: true, // Send cookies (important for sessions/csrf protection)
      }
    );

    // console.log(response.data);
    
    // Pass the data to the parent onSubmit function (if any)
    onSubmit(data); // Ensure this is passed if you still need to call the parent's onSubmit

  } catch (error) {
    console.error("Failed to save job:", error);

    if (error.response && error.response.data) {
    const data = error.response.data;

    let errorMessage = "An error occurred.";

    if (data.details) {
      const firstKey = Object.keys(data.details)[0];
      const firstValue = data.details[firstKey];

      // Convert the key-value to string format: "salary": ["A valid number is required."]
      errorMessage = `"${firstKey}": ${JSON.stringify(firstValue)}`;
    } else if (data.error) {
      errorMessage = data.error;
    }

    alert(errorMessage);
       } else {
      alert("An unexpected error occurred. Please try again.");
    }
  }
};





  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleJobSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State or Remote" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Salary (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $80,000 - $100,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Posting URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/job-posting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateApplied"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Applied</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter key details about the job"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add your personal notes, interview prep, questions to ask, etc."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {isEdit ? "Update Job" : "Add Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
