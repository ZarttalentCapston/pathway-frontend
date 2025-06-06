import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dotenv from "dotenv"

dotenv.config()

export default function QuestionPage3() {
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const API_URL = process.env.API_URL

  const strengths = [
    "Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS",
    "React", "Node.js", "Machine Learning", "Data Analysis", "Cloud Computing",
    "Cybersecurity", "DevOps", "UI/UX Design", "Mobile Development",
    "Leadership", "Communication", "Collaboration", "Critical Thinking",
    "Problem Solving", "Adaptability", "Time Management", "Creativity",
    "Emotional Intelligence", "Conflict Resolution",
    "Project Management", "Product Management", "Strategic Thinking",
    "Business Analysis", "Customer Service", "Sales", "Marketing",
    "Operations Management", "Negotiation", "Public Speaking",
    "Teaching", "Research", "Curriculum Development", "Academic Writing",
    "Presentation Skills",
    "Writing", "Reading", "Interpersonal Relationship", "Self-Motivation",
    "Attention to Detail", "Organizational Skills", "Decision Making",
    "Learning Agility", "Coaching/Mentoring", "Others"
  ];

  const toggleStrength = (strength) => {
    setSelectedStrengths((prev) =>
      prev.includes(strength)
        ? prev.filter((s) => s !== strength)
        : [...prev, strength]
    );
  };

  const handleSubmit = async () => {
    if (selectedStrengths.length === 0) {
     
      if (!window.confirm("You didn't select any strengths. Do you want to continue?")) {
        return;
      }
    }

    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/user/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
        },
        body: JSON.stringify({ currentSkills: selectedStrengths }), 
      });

      const data = await response.json(); 

      if (!response.ok) {
        throw new Error(data.error || "Failed to save strengths");
      }

      navigate("/summary");
    } catch (error) {
      console.error('Error saving strengths:', error);
    setError(error.message);
    alert('There was an error saving your strengths: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          What are your career strengths?
        </h1>


        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 max-h-[400px] overflow-y-auto p-2">
          {strengths.map((strength) => (
            <button
              key={strength}
              type="button"
              onClick={() => toggleStrength(strength)}
              className={`px-6 py-3 rounded-full border transition-all ${
                selectedStrengths.includes(strength)
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {strength}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
