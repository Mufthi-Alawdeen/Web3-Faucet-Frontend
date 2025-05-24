import React from "react";
import { FaBriefcase } from "react-icons/fa";

const GuaranteeCard = () => {
  return (
    <div className="rounded-xl border-2 border-lime-400 p-[28px] bg-white max-w-sm">
      <h3 className="text-xl font-bold text-[#1f2f69] mb-1">
        Metana{" "}
        <span className="underline decoration-lime-400">Guarantees a Job</span>{" "}
        <FaBriefcase className="inline ml-1" />
      </h3>
      <p className="text-gray-500 font-semibold mb-3">
        Plus Risk Free 2-Week Refund Policy
      </p>
      <p className="text-gray-700">
        You’re guaranteed a new job in web3 or you’ll get a full tuition refund.
        We also offer a hassle-free two-week refund policy. If you’re not
        satisfied with your purchase for any reason, you can request a refund,
        no questions asked.
      </p>
    </div>
  );
};

export default GuaranteeCard;
