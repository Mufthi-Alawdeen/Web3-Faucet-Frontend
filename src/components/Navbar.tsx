import React from "react";
import MetanaLogo from "../assets/image.png";

export default function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        padding: "12px 24px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src={MetanaLogo} // Make sure logo.png is in public folder
          alt="Metana Logo"
          style={{ width: "130px", height: "50px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
