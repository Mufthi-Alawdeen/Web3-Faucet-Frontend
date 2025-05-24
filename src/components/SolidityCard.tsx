import React from "react";

const SolidityCard = () => {
  return (
    <div className="rounded-xl bg-white p-[30px] shadow-xl max-w-sm">
      <h3 className="text-xl font-bold text-[#1f2f69] mb-1">
        Web3 <span className="underline decoration-lime-400">Solidity</span>{" "}
        Bootcamp
      </h3>
      <p className="text-gray-500 mb-3">
        The most advanced Solidity curriculum on the internet
      </p>
      <ul className="text-gray-700 space-y-1 mb-3">
        <li>🗓 4 Months</li>
        <li>📊 Prior coding experience required</li>
        <li>⏱ 20h/Week</li>
        <li>🤝 1-on-1 mentorship</li>
        <li>🔍 Expert code reviews</li>
        <li>🎯 Coaching & career services</li>
      </ul>
      <button className="text-purple-700 border border-purple-700 px-4 py-2 mt-3 rounded-full font-semibold hover:bg-purple-50 transition">
        View Program →
      </button>
    </div>
  );
};

export default SolidityCard;
