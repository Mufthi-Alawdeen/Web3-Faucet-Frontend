import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import loadingGif from "../assets/ethGif.gif";
import SocialRewardsCard from "@/components/SocialRewardsCard";

export default function Faucet() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState("");
  const [email, setEmail] = useState("");
  const [txHash, setTxHash] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verified = searchParams.get("verified");
    const emailParam = searchParams.get("email");

    if (verified === "true" && emailParam) {
      setEmail(emailParam);
      setMessage(
        "Your email is verified! Please enter your wallet address to claim Sepolia test ETH."
      );
    } else {
      navigate("/Subscribe");
    }
  }, [searchParams, navigate]);

  const handleClaim = async () => {
    if (!walletAddress) {
      Swal.fire({
        icon: "warning",
        title: "Missing Wallet Address",
        text: "Please enter your wallet address.",
      });
      return;
    }

    setLoading(true);
    setMessage("");
    setTxHash(null);

    Swal.fire({
      title: "Processing Transaction...",
      html: `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      ">
        <img src="${loadingGif}" alt="loading" style="width: 350px;" />
      </div>
    `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.post<{ txHash: string }>(
        "https://faucet-backend.up.railway.app/api/faucet",
        { walletAddress, email }
      );

      setTxHash(res.data.txHash);
      setMessage("Sepolia test ETH sent!");

      Swal.fire({
        icon: "success",
        title: "Tokens Sent!",
        html: `
        <p>Your transaction is complete.</p>
        <a href="https://sepolia.etherscan.io/tx/${res.data.txHash}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">
          View Transaction ↗
        </a>
      `,
        confirmButtonText: "Close",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text:
          err.response?.data?.error ||
          "Failed to send tokens. Please try again.",
        confirmButtonText: "Close",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center items-center py-12 px-4 mt-[30px]">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-[#1f2f69] mb-4">
            Sepolia Test ETH Faucet
          </h2>

          {message && (
            <p className="text-center text-sm text-gray-600 mb-4">{message}</p>
          )}

          <input
            type="text"
            placeholder="Enter your wallet address"
            className="w-full px-4 py-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#1f2f69]"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value.trim())}
          />

          <button
            onClick={handleClaim}
            disabled={loading}
            className="w-full bg-[#cffc03] text-[#1f2f69] font-semibold py-3 rounded hover:brightness-95 transition"
          >
            {loading ? "Sending..." : "Get Sepolia Test ETH"}
          </button>

          {txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-green-600 text-sm underline break-words"
            >
              View Transaction ↗
            </a>
          )}

          <div className="mt-[80px]">
            <SocialRewardsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
