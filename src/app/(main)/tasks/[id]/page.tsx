"use client";

import LiveFeedTaskCard from "@/components/landing/liveFeed/LiveFeedTaskCard";
import { ImageGallery } from "@/components/tasks/ImageGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Task, TaskDetails } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Priority badge styles
const priorityConfig = {
  URGENT: {
    label: "Urgent",
    className: "bg-red-100 text-red-700 border-red-200",
    icon: AlertTriangle,
  },
  HIGH: {
    label: "High",
    className: "bg-orange-100 text-orange-700 border-orange-200",
    icon: ArrowUp,
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: null,
  },
  LOW: {
    label: "Low",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: null,
  },
};

// Status badge styles
const statusConfig = {
  OPEN: { label: "Open", className: "bg-blue-100 text-blue-700" },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700",
  },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelled", className: "bg-gray-100 text-gray-700" },
  PAYMENT_PROCESSING: {
    label: "Payment Processing",
    className: "bg-purple-100 text-purple-700",
  },
};

// Mock task data
const MOCK_TASK: TaskDetails = {
  id: "cmk0nz1zc00012gbxzllqhv20",
  title: "Assemble IKEA Wardrobe and Queen Bed",
  description:
    "I just bought a PAX wardrobe and a Malm bed frame and need help assembling them. I have the instructions but lack a power drill. The boxes are already in the bedroom on the second floor. Please bring your own tools.\n\nRequirements:\n- Experience with IKEA furniture assembly\n- Must bring own power tools (drill, screwdriver set)\n- Ability to lift heavy boxes\n- Clean up after completion",
  category: "MOVING",
  priority: "HIGH",
  postedById: "cmj0szs0m00032g1u4xf1dfgv",
  status: "COMPLETED",
  location: "1205 West Chester Pike, Havertown, PA 19083",
  latitude: 39.976,
  longitude: -75.31,
  baseCompensation: "120",
  scheduledAt: "2026-01-10T10:00:00.000Z",
  estimatedDuration: 180,
  expiresAt: "2026-01-09T20:00:00.000Z",
  createdAt: "2026-01-05T04:32:03.527Z",
  updatedAt: "2026-01-05T04:40:30.046Z",
  images: [],
  postedBy: {
    id: "cmj0szs0m00032g1u4xf1dfgv",
    name: "Mokhlesh Mokha",
    image: null,
  },
};

// Related tasks mock data
const RELATED_TASKS: Task[] = [
  {
    id: "task1",
    title: "Help Moving Boxes to Storage Unit",
    category: "MOVING",
    priority: "MEDIUM",
    status: "OPEN",
    location: "Philadelphia, PA",
    baseCompensation: "80",
    scheduledAt: "2026-02-15T09:00:00.000Z",
    createdAt: "2026-02-08T10:00:00.000Z",
    updatedAt: "2026-02-08T10:00:00.000Z",
    images: [],
  },
  {
    id: "task2",
    title: "Furniture Disassembly for Move",
    category: "MOVING",
    priority: "HIGH",
    status: "OPEN",
    location: "King of Prussia, PA",
    baseCompensation: "100",
    scheduledAt: "2026-02-12T14:00:00.000Z",
    createdAt: "2026-02-07T15:30:00.000Z",
    updatedAt: "2026-02-07T15:30:00.000Z",
    images: [],
  },
  {
    id: "task3",
    title: "Office Desk Assembly",
    category: "REPAIR",
    priority: "LOW",
    status: "OPEN",
    location: "Wayne, PA",
    baseCompensation: "45",
    scheduledAt: "2026-02-18T11:00:00.000Z",
    createdAt: "2026-02-06T08:00:00.000Z",
    updatedAt: "2026-02-06T08:00:00.000Z",
    images: [],
  },
];

// Format time helper
const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

// Format duration helper
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function TaskDetailsPage() {
  const params = useParams();
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchTask = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTask(MOCK_TASK);
      setIsLoading(false);
    };

    fetchTask();
  }, [params.id]);

  if (isLoading) {
    return <TaskDetailsSkeleton />;
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Task not found
          </h1>
          <p className="text-gray-600 mb-4">
            The task you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/tasks">Browse all tasks</Link>
          </Button>
        </div>
      </div>
    );
  }

  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const PriorityIcon = priority.icon;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-20">
      {/* Header */}
      <div className="bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/tasks">
                <ArrowLeft className="w-4 h-4" />
                Back to tasks
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={task.images} alt={task.title} />

            {/* Task Info Card */}
            <Card>
              <CardHeader className="pb-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={cn("border", status.className)}>
                    {status.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("border", priority.className)}
                  >
                    {PriorityIcon && <PriorityIcon className="w-3 h-3 mr-1" />}
                    {priority.label} Priority
                  </Badge>
                  <Badge variant="secondary">
                    {task.category.replace(/_/g, " ")}
                  </Badge>
                </div>

                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  {task.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Compensation */}
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-700">
                      ${task.baseCompensation}
                    </p>
                    <p className="text-xs text-green-600">Compensation</p>
                  </div>

                  {/* Duration */}
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <Timer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-blue-700">
                      {task.estimatedDuration
                        ? formatDuration(task.estimatedDuration)
                        : "Flexible"}
                    </p>
                    <p className="text-xs text-blue-600">Est. Duration</p>
                  </div>

                  {/* Date */}
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-purple-700">
                      {new Date(task.scheduledAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-purple-600">Scheduled</p>
                  </div>

                  {/* Time */}
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-amber-700">
                      {formatTime(task.scheduledAt)}
                    </p>
                    <p className="text-xs text-amber-600">Start Time</p>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Location
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">
                        {task.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Exact address will be shared after application approval
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Price Highlight */}
                <div className="text-center py-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Earn up to</p>
                  <p className="text-4xl font-bold text-green-700">
                    ${task.baseCompensation}
                  </p>
                </div>

                {/* Apply Button */}
                <Button className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>

                <p className="text-xs text-center text-gray-500">
                  By applying, you agree to our Terms of Service
                </p>

                <Separator />

                {/* Posted By */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Posted by
                  </h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={task.postedBy.image || undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {getInitials(task.postedBy.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {task.postedBy.name}
                      </p>
                      <p className="text-sm text-gray-500">Task Poster</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Task Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Posted</span>
                    <span className="text-gray-900">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires</span>
                    <span className="text-gray-900">
                      {task.expiresAt
                        ? new Date(task.expiresAt).toLocaleDateString()
                        : "No expiry"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Task ID</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {task.id.slice(-8)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips Card */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">
                      Safety Reminder
                    </h4>
                    <p className="text-sm text-amber-700">
                      Never share personal financial information. All payments
                      are processed securely through our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Tasks Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Other tasks you might be interested in
            </h2>
            <Button variant="ghost" asChild className="text-blue-600">
              <Link href="/tasks">View all</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_TASKS.map((relatedTask) => (
              <LiveFeedTaskCard key={relatedTask.id} task={relatedTask} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Loading skeleton component
function TaskDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="w-full aspect-video rounded-2xl" />
            <Card>
              <CardHeader>
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                  ))}
                </div>
                <Separator />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-12 w-full" />
                <Separator />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
