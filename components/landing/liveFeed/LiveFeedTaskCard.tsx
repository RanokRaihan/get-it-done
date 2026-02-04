import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

// Shadcn UI Imports
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LiveFeedTaskCard = ({ task }) => {
  return (
    <Card
      key={task.id}
      className="group hover:shadow-lg transition-all duration-300 border-gray-200 flex flex-col h-full"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          {/* Status Badge Logic */}
          <Badge
            variant={task.status === "COMPLETED" ? "secondary" : "default"}
            className={
              task.status === "COMPLETED"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }
          >
            {task.status.replace("_", " ")}
          </Badge>

          {/* Price Badge */}
          <Badge
            variant="outline"
            className="border-green-200 text-green-700 bg-green-50 px-3 py-1 text-sm font-bold"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            {task.baseCompensation}
          </Badge>
        </div>

        <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
          {task.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-6 grow">
        <div className="space-y-3 text-sm text-muted-foreground">
          {/* Location */}
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 opacity-70 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{task.location}</span>
          </div>

          {/* Schedule Date */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 opacity-70 shrink-0" />
            <span>Due: {new Date(task.scheduledAt).toLocaleDateString()}</span>
          </div>

          {/* Posted Date */}
          <div className="flex items-center text-xs text-gray-400 mt-2">
            <Clock className="w-3 h-3 mr-2 opacity-70" />
            Posted {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full bg-slate-900 hover:bg-slate-800" asChild>
          <Link href={`/tasks/${task.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LiveFeedTaskCard;
