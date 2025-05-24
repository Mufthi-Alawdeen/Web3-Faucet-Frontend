
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass?: string;
}

const MarketingCard: React.FC<MarketingCardProps> = ({ title, description, icon, bgClass = "bg-indigo-50" }) => {
  return (
    <Card className={`border-0 shadow-md overflow-hidden ${bgClass}`}>
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MarketingCard;
