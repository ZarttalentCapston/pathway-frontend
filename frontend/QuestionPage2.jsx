import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dotenv from "dotenv"

dotenv.config()

export default function QuestionPage2() {
  const [targetRole, setTargetRole] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const API_URL = process.env.API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!targetRole) {
      setError('Please enter a career goal.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/roles/target`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetRole })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      navigate(data.nextStep || '/question3');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">What is your career goal?</h1>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Enter your desired role (e.g., Product Manager, Frontend Developer, Data Analyst).
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Backend Developer"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
}
