import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import loadingGif from "../assets/email.gif";

const panelVariants = {
  hiddenLeft: { rotateY: 90, opacity: 0, transformOrigin: "left center" },
  hiddenRight: { rotateY: -90, opacity: 0, transformOrigin: "right center" },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exitLeft: { rotateY: -90, opacity: 0, transformOrigin: "left center" },
  exitRight: { rotateY: 90, opacity: 0, transformOrigin: "right center" },
};

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", agree: false });
  const [checkEmail, setCheckEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const direction = isNewUser ? 1 : -1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      Swal.fire("Oops!", "Please agree to receive emails.", "warning");
      return;
    }

    Swal.fire({
      title: "Sending Verification Email...",
      html: `
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
          <img src="${loadingGif}" style="width: 150px;" alt="Sending..." />
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    try {
      await fetch(
        "https://faucet-backend-production.up.railway.app/api/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email }),
        }
      );

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Check your inbox to verify.",
        });
        // ✅ Reset form after success
        setForm({ name: "", email: "", agree: false });
        onClose();
      }, 700);
    } catch {
      Swal.fire("Error", "Failed to send verification email", "error");
    }
  };

  const handleCheck = async () => {
    if (!checkEmail) {
      Swal.fire("Please enter your email", "", "warning");
      return;
    }

    try {
      const res = await fetch(
        `https://faucet-backend-production.up.railway.app/api/check-subscription?email=${encodeURIComponent(
          checkEmail
        )}`
      );
      const data = await res.json();

      if (!data.exists) {
        Swal.fire("Not Found", "Email not found. Try subscribing.", "info");
      } else if (data.verified) {
        // ✅ Clear email input after success
        setCheckEmail("");
        window.location.href = `/faucet?verified=true&email=${encodeURIComponent(
          data.email
        )}`;
      } else {
        setCheckEmail("");
        window.location.href = `/verify?token=${data.verificationToken}`;
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isNewUser ? "new" : "existing"}
            custom={direction}
            variants={panelVariants}
            initial={direction > 0 ? "hiddenLeft" : "hiddenRight"}
            animate="visible"
            exit={direction > 0 ? "exitLeft" : "exitRight"}
          >
            {isNewUser ? (
              <form className="flex flex-col gap-4" onSubmit={handleSubscribe}>
                <h2 className="text-2xl font-semibold text-center text-[#1f2f69] mb-4">
                  Get Sepolia Test ETH
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control border px-3 py-2 rounded"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-control border px-3 py-2 rounded"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="me-2"
                    required
                  />
                  By subscribing, I agree to receive updates and offer emails
                  from Metana.
                </label>
                <button
                  type="submit"
                  className="w-full py-2 mt-2 rounded text-[#1f2f69] font-bold"
                  style={{ backgroundColor: "#cffc03" }}
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
                <button
                  onClick={() => setIsNewUser(false)}
                  type="button"
                  className="text-sm underline text-center text-[#1f2f69] mt-3 font-bold"
                >
                  Already subscribed? Enter your email
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-center text-[#1f2f69] mb-4">
                  Welcome Back!
                </h2>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control border px-3 py-2 rounded"
                  value={checkEmail}
                  onChange={(e) => setCheckEmail(e.target.value)}
                />
                <button
                  onClick={handleCheck}
                  className="w-full py-2 rounded text-[#cffc03] font-bold"
                  style={{ backgroundColor: "#1f2f69" }}
                >
                  Continue
                </button>
                <button
                  onClick={() => setIsNewUser(true)}
                  type="button"
                  className="text-sm underline text-center text-[#1f2f69] mt-3 font-bold"
                >
                  New here? Subscribe now
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
