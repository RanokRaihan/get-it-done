"use client";

import LiveFeedTaskCard from "@/components/landing/liveFeed/LiveFeedTaskCard";
import {
  ActiveFilters,
  MultiSelectFilter,
} from "@/components/tasks/TaskFilters";
import { TaskPagination } from "@/components/tasks/TaskPagination";
import { TaskSearch } from "@/components/tasks/TaskSearch";
import { TaskGridSkeleton } from "@/components/tasks/TaskSkeleton";
import { TaskSort } from "@/components/tasks/TaskSort";
import { Button } from "@/components/ui/button";
import {
  FilterState,
  PaginationMeta,
  SortField,
  SortOrder,
  Task,
  TaskCategory,
  TaskCategoryType,
  TaskPriority,
  TaskPriorityType,
} from "@/lib/types";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Box,
  Briefcase,
  ClipboardList,
  Dog,
  Flower2,
  Laptop,
  RefreshCw,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

// Category options with icons
const categoryOptions = [
  {
    value: TaskCategory.DELIVERY,
    label: "Delivery",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    value: TaskCategory.CLEANING,
    label: "Cleaning",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    value: TaskCategory.REPAIR,
    label: "Repair",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    value: TaskCategory.TUTORING,
    label: "Tutoring",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    value: TaskCategory.GARDENING,
    label: "Gardening",
    icon: <Flower2 className="h-4 w-4" />,
  },
  {
    value: TaskCategory.MOVING,
    label: "Moving",
    icon: <Box className="h-4 w-4" />,
  },
  {
    value: TaskCategory.PET_CARE,
    label: "Pet Care",
    icon: <Dog className="h-4 w-4" />,
  },
  {
    value: TaskCategory.TECH_SUPPORT,
    label: "Tech Support",
    icon: <Laptop className="h-4 w-4" />,
  },
  {
    value: TaskCategory.OTHER,
    label: "Other",
    icon: <ClipboardList className="h-4 w-4" />,
  },
];

// Priority options with visual indicators
const priorityOptions = [
  {
    value: TaskPriority.URGENT,
    label: "Urgent",
    icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
  },
  {
    value: TaskPriority.HIGH,
    label: "High",
    icon: <ArrowUp className="h-4 w-4 text-orange-500" />,
  },
  {
    value: TaskPriority.MEDIUM,
    label: "Medium",
    icon: (
      <span className="h-4 w-4 flex items-center justify-center text-yellow-500">
        ●
      </span>
    ),
  },
  {
    value: TaskPriority.LOW,
    label: "Low",
    icon: <ArrowDown className="h-4 w-4 text-green-500" />,
  },
];

// Mock data for demonstration
const MOCK_TASKS: Task[] = [
  {
    id: "cmj0tjgji000d2g1ut8cwiaqu",
    title: "Assemble and Install a Wooden Bookshelf",
    description:
      "Need a skilled handyman to assemble a flat-pack wooden bookshelf.",
    category: "REPAIR",
    priority: "HIGH",
    status: "PAYMENT_PROCESSING",
    location: "456 Pine Avenue, Springfield, IL 62704",
    baseCompensation: "60",
    scheduledAt: "2025-09-18T10:00:00.000Z",
    createdAt: "2025-12-11T02:28:11.262Z",
    updatedAt: "2025-12-22T02:26:55.634Z",
    images: [],
  },
  {
    id: "cmjnfqzxq00012gf7k7wmc5ux",
    title: "Lawn Mowing and Hedge Trimming",
    description: "Looking for someone to mow a 0.5-acre backyard.",
    category: "GARDENING",
    priority: "MEDIUM",
    status: "COMPLETED",
    location: "890 Maple Drive, Austin, TX 78701",
    baseCompensation: "85",
    scheduledAt: "2025-09-20T09:00:00.000Z",
    createdAt: "2025-12-26T22:20:50.414Z",
    updatedAt: "2026-01-02T23:08:00.081Z",
    images: [],
  },
  {
    id: "cmk0nz1zc00012gbxzllqhv20",
    title: "Assemble IKEA Wardrobe and Queen Bed",
    description: "I just bought a PAX wardrobe and a Malm bed frame.",
    category: "MOVING",
    priority: "HIGH",
    status: "COMPLETED",
    location: "1205 West Chester Pike, Havertown, PA 19083",
    baseCompensation: "120",
    scheduledAt: "2026-01-10T10:00:00.000Z",
    createdAt: "2026-01-05T04:32:03.527Z",
    updatedAt: "2026-01-05T04:40:30.046Z",
    images: [],
  },
  {
    id: "task4",
    title: "Dog Walking Service Needed",
    description: "Need someone to walk my two golden retrievers.",
    category: "PET_CARE",
    priority: "LOW",
    status: "OPEN",
    location: "123 Oak Street, Portland, OR 97201",
    baseCompensation: "35",
    scheduledAt: "2026-02-15T14:00:00.000Z",
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-02-01T10:00:00.000Z",
    images: [],
  },
  {
    id: "task5",
    title: "Urgent Plumbing Repair - Leaking Pipe",
    description: "Water pipe burst under kitchen sink, need immediate help.",
    category: "REPAIR",
    priority: "URGENT",
    status: "OPEN",
    location: "789 Elm Boulevard, Denver, CO 80202",
    baseCompensation: "150",
    scheduledAt: "2026-02-08T08:00:00.000Z",
    createdAt: "2026-02-07T23:00:00.000Z",
    updatedAt: "2026-02-07T23:00:00.000Z",
    images: [],
  },
  {
    id: "task6",
    title: "Help Setting Up Home WiFi Network",
    description: "Need tech support to set up mesh WiFi system.",
    category: "TECH_SUPPORT",
    priority: "MEDIUM",
    status: "OPEN",
    location: "456 Tech Lane, San Jose, CA 95110",
    baseCompensation: "75",
    scheduledAt: "2026-02-12T16:00:00.000Z",
    createdAt: "2026-02-05T14:30:00.000Z",
    updatedAt: "2026-02-05T14:30:00.000Z",
    images: [],
  },
];

const initialFilters: FilterState = {
  categories: [],
  priorities: [],
  search: "",
  sortField: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 9,
};

export default function AllTasksPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks when filters change
  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter tasks based on current filters
      let filteredTasks = [...MOCK_TASKS];

      // Apply category filter
      if (filters.categories.length > 0) {
        filteredTasks = filteredTasks.filter((task) =>
          filters.categories.includes(task.category),
        );
      }

      // Apply priority filter
      if (filters.priorities.length > 0) {
        filteredTasks = filteredTasks.filter((task) =>
          filters.priorities.includes(task.priority),
        );
      }

      // Apply search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTasks = filteredTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description?.toLowerCase().includes(searchLower) ||
            task.location.toLowerCase().includes(searchLower),
        );
      }

      // Apply sorting
      filteredTasks.sort((a, b) => {
        let comparison = 0;
        if (filters.sortField === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (filters.sortField === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else if (filters.sortField === "updatedAt") {
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        return filters.sortOrder === "asc" ? comparison : -comparison;
      });

      // Apply pagination
      const total = filteredTasks.length;
      const totalPages = Math.ceil(total / filters.limit);
      const start = (filters.page - 1) * filters.limit;
      const paginatedTasks = filteredTasks.slice(start, start + filters.limit);

      if (isMounted) {
        setTasks(paginatedTasks);
        setMeta({
          total,
          page: filters.page,
          limit: filters.limit,
          totalPages,
          hasNextPage: filters.page < totalPages,
          hasPreviousPage: filters.page > 1,
        });
        setIsLoading(false);
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  // Filter handlers
  const handleCategoryChange = (categories: string[]) => {
    setFilters((prev) => ({
      ...prev,
      categories: categories as TaskCategoryType[],
      page: 1,
    }));
  };

  const handlePriorityChange = (priorities: string[]) => {
    setFilters((prev) => ({
      ...prev,
      priorities: priorities as TaskPriorityType[],
      page: 1,
    }));
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleSortChange = (sortField: SortField, sortOrder: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortField, sortOrder }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
      page: 1,
    }));
  };

  const handleRemovePriority = (priority: string) => {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.filter((p) => p !== priority),
      page: 1,
    }));
  };

  const handleClearAllFilters = () => {
    setFilters(initialFilters);
  };

  const handleRefresh = () => {
    // Trigger a re-fetch by resetting the page
    setFilters((prev) => ({ ...prev }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Browse Tasks
              </h1>
              <p className="text-muted-foreground mt-1">
                Find tasks that match your skills and availability
              </p>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block w-full max-w-md">
              <TaskSearch
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search by title, description, or location..."
              />
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden mb-4">
            <TaskSearch
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="w-full"
            />
          </div>

          {/* Filters and Sort Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <MultiSelectFilter
                title="Category"
                options={categoryOptions}
                selectedValues={filters.categories}
                onSelectionChange={handleCategoryChange}
              />
              <MultiSelectFilter
                title="Priority"
                options={priorityOptions}
                selectedValues={filters.priorities}
                onSelectionChange={handlePriorityChange}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="shrink-0"
                title="Refresh"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>

            {/* Sort */}
            <TaskSort
              sortField={filters.sortField}
              sortOrder={filters.sortOrder}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Active Filters */}
          <div className="mt-4">
            <ActiveFilters
              categories={filters.categories}
              priorities={filters.priorities}
              onRemoveCategory={handleRemoveCategory}
              onRemovePriority={handleRemovePriority}
              onClearAll={handleClearAllFilters}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        {!isLoading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {meta.total === 0 ? (
                "No tasks found"
              ) : (
                <>
                  Found{" "}
                  <span className="font-semibold text-foreground">
                    {meta.total}
                  </span>{" "}
                  task{meta.total !== 1 ? "s" : ""}
                  {(filters.categories.length > 0 ||
                    filters.priorities.length > 0 ||
                    filters.search) &&
                    " matching your criteria"}
                </>
              )}
            </p>
          </div>
        )}

        {/* Task Grid */}
        {isLoading ? (
          <TaskGridSkeleton count={6} />
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tasks found
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Try adjusting your filters or search terms to find what
              you&apos;re looking for.
            </p>
            <Button variant="outline" onClick={handleClearAllFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <LiveFeedTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && meta.total > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-4">
            <TaskPagination meta={meta} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
