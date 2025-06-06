import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dotenv from "dotenv"

dotenv.config()

export default function SummaryPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

   const API_URL = process.env.API_URL

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_URL}/user/summary`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    fetchSummary();
  }, []);

  const handleConfirm = async () => {
    try {
      const res = await fetch(`${API_URL}/user/summary/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/dashboard');
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Confirmation error:', err);
    }
  };

  if (!userData) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const { currentRole, targetRole, skills } = userData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Review Your Profile</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Current Role</h2>
            <p className="text-gray-600">{currentRole || 'Not provided'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Career Goal</h2>
            <p className="text-gray-600">{targetRole?.name || 'Not provided'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Strengths</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {(skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleConfirm}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
}
