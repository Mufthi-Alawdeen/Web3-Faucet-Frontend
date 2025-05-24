
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TaskButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const TaskButton: React.FC<TaskButtonProps> = ({ icon, label, href }) => {
  return (
    <Button 
      variant="outline" 
      className="flex items-center justify-between w-full px-4 py-5 text-left bg-white hover:bg-indigo-50 border border-gray-200 rounded-lg shadow-sm transition-all hover:shadow-md"
      onClick={() => window.open(href, "_blank")}
    >
      <div className="flex items-center">
        <span className="mr-3 text-indigo-600">{icon}</span>
        <span>{label}</span>
      </div>
      <ExternalLink className="h-4 w-4 text-gray-500" />
    </Button>
  );
};

export default TaskButton;
