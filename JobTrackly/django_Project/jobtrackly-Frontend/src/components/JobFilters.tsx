
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobStatus } from "@/types/job";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: JobStatus | "all";
    sortBy: "dateApplied" | "dateModified" | "company" | "position";
    sortOrder: "asc" | "desc";
  }) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"dateApplied" | "dateModified" | "company" | "position">("dateApplied");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, status, sortBy, sortOrder);
  };

  const handleStatusChange = (value: string) => {
    const newStatus = value as JobStatus | "all";
    setStatus(newStatus);
    applyFilters(search, newStatus, sortBy, sortOrder);
  };

  const handleSortByChange = (value: string) => {
    const newSortBy = value as "dateApplied" | "dateModified" | "company" | "position";
    setSortBy(newSortBy);
    applyFilters(search, status, newSortBy, sortOrder);
  };

  const handleSortOrderChange = (value: string) => {
    const newSortOrder = value as "asc" | "desc";
    setSortOrder(newSortOrder);
    applyFilters(search, status, sortBy, newSortOrder);
  };

  const applyFilters = (
    search: string,
    status: JobStatus | "all",
    sortBy: "dateApplied" | "dateModified" | "company" | "position",
    sortOrder: "asc" | "desc"
  ) => {
    onFilterChange({
      search,
      status,
      sortBy,
      sortOrder,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-8"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-muted" : ""}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select onValueChange={handleStatusChange} defaultValue={status}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Sort By</label>
            <Select onValueChange={handleSortByChange} defaultValue={sortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateApplied">Date Applied</SelectItem>
                <SelectItem value="dateModified">Last Modified</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="position">Position</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Order</label>
            <Select onValueChange={handleSortOrderChange} defaultValue={sortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
