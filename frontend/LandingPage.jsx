import { Link } from "react-router-dom";

export default function LandingPage() {
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

      {/* Hero Section */}
      <section id="home" className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 lg:px-20 py-20 lg:py-40 max-w-7xl mx-auto">
        <div className="max-w-md mb-10 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Find your personalized path to your dream job
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Pathway calculates the steps you need to progress in your career, identifying the roles and skills required to reach your goals.
          </p>
          <Link to="/signup" className="bg-[#ffa600] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e69500] transition-colors">
            Get Started
          </Link>
        </div>
        <div>
          <img src="/path.png" alt="Career Path Illustration" className="w-[300px] lg:w-[400px]" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-10">Why Choose Pathway?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/feature1.png" alt="AI-Powered Planning Icon" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Career Planning</h3>
            <p className="text-sm text-gray-600">
              Our AI analyzes your skills and goals to create a tailored career roadmap, guiding you step-by-step to success.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/feature2.png" alt="Resume Feedback Icon" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Resume Feedback</h3>
            <p className="text-sm text-gray-600">
              Get instant, actionable feedback on your resume to align it with your target roles and industries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="/feature3.png" alt="Learning Paths Icon" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Targeted Learning Paths</h3>
            <p className="text-sm text-gray-600">
              Discover recommended courses and skills to bridge gaps and prepare for your next career move.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 sm:px-8 py-16 bg-gradient-to-b from-white to-[#f5f6fc] max-w-7xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 italic mb-4">
              "Pathway helped me switch industries by identifying the exact skills I needed. I landed my dream job in just three months!"
            </p>
            <p className="text-sm font-semibold">— Sarah K., Marketing Manager</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 italic mb-4">
              "The resume feedback feature was a game-changer. It gave me confidence to apply for roles I thought were out of reach."
            </p>
            <p className="text-sm font-semibold">— James L., Software Engineer</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/signup" className="bg-[#ffa600] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e69500] transition-colors">
            Join Them Today
          </Link>
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