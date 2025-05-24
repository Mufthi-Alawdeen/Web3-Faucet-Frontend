
import React from "react";

const FaucetAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-60 bg-gradient-to-b from-indigo-50 to-white rounded-lg flex items-center justify-center overflow-hidden">
      <div className="faucet-container">
        <div className="faucet">
          <div className="faucet-head"></div>
          <div className="faucet-neck"></div>
          <div className="water-drop"></div>
        </div>
        <div className="eth-symbol">Ξ</div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .faucet-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .faucet {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .faucet-head {
          width: 60px;
          height: 20px;
          background-color: #6b7280;
          border-radius: 4px 4px 0 0;
        }
        
        .faucet-neck {
          width: 20px;
          height: 40px;
          background-color: #6b7280;
        }
        
        .water-drop {
          width: 14px;
          height: 18px;
          background-color: #6366f1;
          border-radius: 50%;
          position: relative;
          animation: drip 2s infinite;
          opacity: 0;
          transform: translateY(-10px);
        }
        
        .eth-symbol {
          font-size: 3rem;
          color: #6366f1;
          margin-top: 20px;
          font-weight: bold;
        }
        
        @keyframes drip {
          0% {
            transform: translateY(-5px);
            opacity: 0;
          }
          20% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            transform: translateY(40px);
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
      `}} />
    </div>
  );
};

export default FaucetAnimation;
