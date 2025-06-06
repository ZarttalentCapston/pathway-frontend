import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-[#f5f6fc] text-gray-800 font-sans min-h-screen">
      {/* Navbar */}
      <header className="bg-[#00214d] text-white flex justify-between items-center px-6 py-4 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Pathway Logo" className="w-8 h-8" />
        </Link>
        <nav className="space-x-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/signin" className="bg-[#ffa600] text-black px-4 py-1 rounded-full text-sm font-medium">
            Login
          </Link>
        </nav>
      </header>

      {/* About Section */}
      <section id="About" className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl text-center underline font-bold mb-10">About Us</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img src="/path-about.png" alt="Pathway Platform Illustration" className="w-40 h-40 object-contain" />
          <div className="text-sm text-gray-700 space-y-4">
            <p>At Pathway, we believe that every professional deserves a clear and achievable route to their dream career. Too often, employees have big ambitions but lack the roadmap, guidance, or tools to get there. That’s where we come in.</p>
            <p><strong>Pathway is an AI-powered career development platform</strong> that helps you chart a personalized career journey from where you are to where you want to be. Whether you’re aiming for a promotion, switching industries, or pursuing a long-term dream role, Pathway identifies the steps, roles, and skills you need to progress confidently.</p>
            <ul className="list-disc list-inside">
              <li>Analyzes your current skill set and highlights areas for growth.</li>
              <li>Recommends targeted learning paths and job roles.</li>
              <li>Provides real-time resume feedback tailored to your goals.</li>
              <li>Tracks your readiness for each career step.</li>
            </ul>
            <p>With Pathway, you’re never guessing—you’re growing. Join thousands of professionals using Pathway to take control of their careers with clarity, confidence, and purpose.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00214d] text-white text-center py-10">
        <div className="mb-4">
          <img src="/logo.png" alt="Pathway Logo" className="w-8 h-8 mx-auto" />
        </div>
        <div className="flex justify-center space-x-8 text-sm mb-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="text-sm">All rights reserved © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}