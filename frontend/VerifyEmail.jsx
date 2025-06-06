import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dotenv from "dotenv"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

dotenv.config()

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [loadingLoginRedirect, setLoadingLoginRedirect] = useState(false);

  const API_URL = process.env.API_URL

  

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      setStatus("pending");
      return;
    }

    setStatus("loading");
    let timeoutId;
    axios
      .get(`${API_URL}/auth/verify-email`, {
        params: { token },
      })
      .then((res) => {
        console.log("✅ Verification response:", res.data);
        setStatus("success");
        toast.success(res.data.message || "Email verified successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          style: { backgroundColor: "#ffa600", color: "#fff" },
        });
        timeoutId = setTimeout(() => {
          console.log("Attempting to navigate to /signin");
          try {
            navigate("/signin");
          } catch (error) {
            console.error("Navigation error:", error);
          }
        }, 3000);
      })
      .catch((err) => {
        console.error("❌ Verification error:", err);
        setStatus("error");
        const msg =
          err.response?.data?.error || "Verification failed. Please try again.";
        toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          style: { backgroundColor: "#ef4444", color: "#fff" },
        });
      });
    return () => clearTimeout(timeoutId);
  }, [location.search, navigate]);

  const handleLoginRedirect = () => {
    setLoadingLoginRedirect(true);
    setTimeout(() => {
      navigate("/signin");
    }, 500); // Brief delay for spinner visibility
  };

  return (
    <div>
      <ToastContainer />
      {status === "pending" && (
        <PageWrapper>
          <p className="text-center text-[#00214d] text-lg">
            Please check your email for a verification link.
          </p>
          <p className="text-center text-gray-600 text-sm">
            Didn't receive an email?{" "}
            <button
              onClick={() => alert("Resend functionality not implemented yet.")}
              className="text-[#ffa600] hover:underline"
            >
              Resend verification email
            </button>
          </p>
          <button
            onClick={handleLoginRedirect}
            disabled={loadingLoginRedirect}
            className={`mt-4 flex items-center justify-center bg-[#ffa600] text-white py-2 px-3 rounded-md font-medium text-sm transition-colors ${
              loadingLoginRedirect ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#e69500]"
            }`}
          >
            {loadingLoginRedirect ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  />
                </svg>
                Redirecting...
              </span>
            ) : (
              "Go to Login"
            )}
          </button>
        </PageWrapper>
      )}
      {status === "loading" && (
        <PageWrapper>
          <TailSpin height={80} width={80} color="#ffa600" ariaLabel="loading" />
          <p className="text-lg text-[#ffa600]">Verifying your email...</p>
        </PageWrapper>
      )}
      {status === "error" && (
        <PageWrapper>
          <p className="text-center text-[#ef4444] text-lg">
            Verification failed or token invalid. Please try again.
          </p>
          <p className="text-center text-gray-600 text-sm">
            <button
              onClick={() => alert("Resend functionality not implemented yet.")}
              className="text-[#ffa600] hover:underline"
            >
              Resend verification email
            </button>
          </p>
        </PageWrapper>
      )}
      {status === "success" && (
        <PageWrapper>
          <p className="text-center text-[#ffa600] text-lg">
            Email verified successfully! Redirecting you to login page...
          </p>
          <button
            onClick={handleLoginRedirect}
            disabled={loadingLoginRedirect}
            className={`mt-4 flex items-center justify-center bg-[#ffa600] text-white py-2 px-3 rounded-md font-medium text-sm transition-colors ${
              loadingLoginRedirect ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#e69500]"
            }`}
          >
            {loadingLoginRedirect ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  />
                </svg>
                Redirecting...
              </span>
            ) : (
              "Go to Login"
            )}
          </button>
        </PageWrapper>
      )}
    </div>
  );
};

const PageWrapper = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6fc] space-y-4 px-4">
    {children}
  </div>
);

export default VerifyEmail;