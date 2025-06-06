import { Link } from "react-router-dom";
import { sendContactForm } from "./api/contact";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await sendContactForm(form);
      toast.success(result.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f6fc] text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      <header className="bg-[#00214d] text-white flex justify-between items-center px-6 py-4 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Pathway Logo" className="w-8 h-8" />
        </Link>
        <nav className="space-x-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/#About" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/signin" className="bg-[#ffa600] text-black px-4 py-1 rounded-full text-sm font-medium">
            Login
          </Link>
        </nav>
      </header>

      {/* Contact Section */}
      <section id="Contact" className="px-4 sm:px-8 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl text-center underline font-bold mb-10">Contact Us</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffa600] placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ffa600] placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 text-sm">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="w-full px-4 py-2 h-40 border rounded-md focus:ring-2 focus:ring-[#ffa600] placeholder-gray-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#ffa600] text-white py-3 rounded-md font-medium flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#00214d] text-white text-center py-10">
        <div className="mb-4">
          <img src="/logo.png" alt="Pathway Logo" className="w-8 h-8 mx-auto" />
        </div>
        <div className="flex justify-center space-x-8 text-sm mb-4">
          <Link to="/">Home</Link>
          <Link to="/#About">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="text-sm">All rights reserved © {new Date().getFullYear()}</p>
      </footer>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}