
import React from "react";
import { Button } from "@/components/ui/button";

interface GetSepoliaButtonProps {
  onClick: () => void;
}

const GetSepoliaButton: React.FC<GetSepoliaButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      Get Sepolia ETH
    </Button>
  );
};

export default GetSepoliaButton;
