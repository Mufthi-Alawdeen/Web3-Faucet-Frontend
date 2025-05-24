import React, { useState, useEffect } from "react";
import FaucetAnimation from "@/components/FaucetAnimation";
import GetSepoliaButton from "@/components/GetSepoliaButton";
import EmailPopup from "@/components/EmailPopup";
import CountdownTimer from "@/components/CountdownTimer";
import MarketingCard from "@/components/MarketingCard";
import TaskButton from "@/components/TaskButton";
import { toast } from "@/components/ui/sonner";
import {
  Instagram,
  Youtube,
  Code,
  Twitter,
  Info,
  Rocket,
  Shield,
} from "lucide-react";
import Logo from "../assets/image.png";
import Video from "../assets/Etherium animation.mp4";
import GuaranteeCard from "@/components/GuaranteeCard";
import SolidityCard from "@/components/SolidityCard";
import BeginnerCard from "@/components/BeginnerCard";
import FullstackCard from "@/components/FullstackCard";
import SocialRewardsCard from "../components/SocialRewardsCard";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(
    localStorage.getItem("lastSepoliaRequest")
      ? Number(localStorage.getItem("lastSepoliaRequest"))
      : null
  );

  const handleGetSepolia = () => {
    const currentTime = Date.now();

    // Check if 24 hours have passed since last request
    if (
      lastRequestTime &&
      currentTime - lastRequestTime < 24 * 60 * 60 * 1000
    ) {
      toast("Please wait until the countdown finishes before requesting again");
      return;
    }

    setShowPopup(true);
  };

  const handleSubmitEmail = (email: string) => {
    // Store the current time as the last request time
    const currentTime = Date.now();
    localStorage.setItem("lastSepoliaRequest", currentTime.toString());
    setLastRequestTime(currentTime);

    // Close the popup
    setShowPopup(false);

    // Show success message
    toast.success("Sepolia ETH has been sent to your wallet!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white">
      {/* Header with Metana logo */}
      <header className="w-full py-6 px-4 flex justify-center">
        <div className="w-40 h-12 bg-white p-2 rounded-md flex items-center justify-center">
          <img
            src={Logo} // replace this with the correct path
            alt="Metana Logo"
            className="h-[100px] object-contain"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Marketing Section */}
          <div className="w-full md:w-1/4 space-y-6">
            <GuaranteeCard />
            <BeginnerCard />
          </div>

          {/* Center Main Content */}
          <div className="w-full md:w-2/4 flex flex-col items-center justify-center mt-[-10px]">
            <h2 className="text-4xl font-bold text-[#1f2f69] mb-6 text-center">
              Web3 Faucet
            </h2>

            <video
              src={Video}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />

            {/* Get Sepolia Button */}
            <div className="mb-10 mt-[40px]">
              <button
                onClick={handleGetSepolia}
                className="py-5 px-8 rounded text-center font-semibold"
                style={{
                  backgroundColor: "#cffc03",
                  color: "#1f2f69",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Get Sepolia Test ETH
              </button>
            </div>

            {/* Info Text */}
            <div className="text-center text-gray-600 mb-8">
              <p className="mb-4">
                Get Sepolia test ETH for your Ethereum development needs
              </p>
            </div>

            {/* Timer if applicable */}
            {lastRequestTime && (
              <div className="mb-10 w-full max-w-md">
                <CountdownTimer lastRequestTime={lastRequestTime} />
              </div>
            )}

            <div className="w-full max-w-md mt-6">
              <SocialRewardsCard />
            </div>
          </div>

          {/* Right Marketing Section */}
          <div className="w-full md:w-1/4 space-y-6 mt-[-10px]">
            <SolidityCard />
            <FullstackCard />
          </div>
        </div>
      </div>

      {/* Email popup */}
      <EmailPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmitEmail}
      />
    </div>
  );
};

export default Index;
